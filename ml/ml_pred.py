# ml_pred.py

import uvicorn
import pandas as pd
import xgboost as xgb
from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from ultralytics import YOLO
from PIL import Image
import io
import json
import os # <-- Add this import

app = FastAPI(title="Rockfall Fusion API")

# Correct the path to the model file to be relative to the script's location
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
XGB_MODEL_PATH = os.path.join(SCRIPT_DIR, "rockfall_sensor_environment_model.json")
YOLO_MODEL_PATH = os.path.join(SCRIPT_DIR, "vision_rocks_cracks.pt")

# XGBoost model
xgb_model = xgb.XGBClassifier()
# CORRECTED: Use the absolute path to load the model
xgb_model.load_model(XGB_MODEL_PATH)

# YOLO image model
yolo_model = YOLO(YOLO_MODEL_PATH)

EXPECTED_COLUMNS = [
    'temperature', 'rainfall', 'soil_moisture', 'vib_rms',
    'porepressure', 'displacement',
    'center_lat', 'center_lon',
    'dem_mean_elev', 'dem_max_slope', 'dem_mean_slope', 'dem_aspect',
    'month', 'day_of_week', 'day_of_year'
]

@app.post("/rockfall/predict")
async def fusion_predict(
    tabular_data: str = Form(...),
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

        alpha, beta = 0.6, 0.4
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

if __name__ == "__main__":
    uvicorn.run("ml_pred:app", host="0.0.0.0", port=8000, reload=True)
