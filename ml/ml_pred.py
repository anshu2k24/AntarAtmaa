import uvicorn
import pandas as pd
import xgboost as xgb
from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from ultralytics import YOLO
from PIL import Image
import io
import json
app = FastAPI(title="Rockfall Fusion API")

# XGBoost model
xgb_model = xgb.XGBClassifier()
xgb_model.load_model("rockfall_sensor_environment_model.json")

# YOLO image model
MODEL_PATH = "vision_rocks_cracks.pt"
yolo_model = YOLO(MODEL_PATH)

EXPECTED_COLUMNS = [
    'temperature', 'rainfall', 'soil_moisture', 'vib_rms',
    'porepressure', 'displacement',
    'center_lat', 'center_lon',
    'dem_mean_elev', 'dem_max_slope', 'dem_mean_slope', 'dem_aspect',
    'month', 'day_of_week', 'day_of_year'
]

@app.post("/rockfall/predict")
async def fusion_predict(
    tabular_data: str = Form(...),  # receive as string
    file: UploadFile = File(...)
):
    try:
        data_list = json.loads(tabular_data)
        df = pd.DataFrame(data_list)
        df = df[EXPECTED_COLUMNS].astype("float32")

        rockfall_probs = xgb_model.predict_proba(df)[:, 1].tolist()

        contents = await file.read()
        img = Image.open(io.BytesIO(contents))
        results = yolo_model.predict(img, conf=0.25)

        yolo_score = 0.0
        detections = []

        for r in results:
            for box, conf, cls in zip(r.boxes.xyxy.tolist(), r.boxes.conf.tolist(), r.boxes.cls.tolist()):
                detections.append({
                    "class": yolo_model.names[int(cls)],
                    "confidence": float(conf),
                    "bbox": [float(x) for x in box]
                })
                yolo_score = max(yolo_score, float(conf))

        alpha, beta = 0.6, 0.4  # weights
        fused_scores, risk_levels = [], []

        for prob in rockfall_probs:
            severity = (alpha * prob) + (beta * yolo_score)
            fused_scores.append(severity)

            if severity < 0.3:
                risk_levels.append("Low")
            elif severity < 0.6:
                risk_levels.append("Medium")
            else:
                risk_levels.append("High")

        return {
            "rockfall_probabilities": rockfall_probs,
            "yolo_detections": detections,
            "fusion_scores": fused_scores,
            "risk_levels": risk_levels
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if _name_ == "_main_":
    uvicorn.run("ml_pred:app", host="0.0.0.0", port=8000, reload=True)
