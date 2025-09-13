import uvicorn
import pandas as pd
import xgboost as xgb
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

# Initialize FastAPI
app = FastAPI(title="Rockfall Prediction API")

model = xgb.XGBClassifier()
model.load_model("rockfall_model.json")

class RockfallData(BaseModel):
    temperature: float
    rainfall: float
    soil_moisture: float
    vib_rms: float
    porepressure: float
    displacement: float
    dem_mean_slope: float
    dem_max_slope: float
    dem_mean_elev: float
    dem_aspect: float
    center_lat: float
    center_lon: float
    month: int
    day_of_week: int
    day_of_year: int

# column order as trained dataset input
EXPECTED_COLUMNS = [
    'temperature', 'rainfall', 'soil_moisture', 'vib_rms',
    'porepressure', 'displacement',
    'center_lat', 'center_lon',
    'dem_mean_elev', 'dem_max_slope', 'dem_mean_slope', 'dem_aspect',
    'month', 'day_of_week', 'day_of_year'
]


@app.post("/predict")
async def predict_rockfall(data: List[RockfallData]):
    try:
        df = pd.DataFrame([d.dict() for d in data])

        missing_cols = [col for col in EXPECTED_COLUMNS if col not in df.columns]
        if missing_cols:
            raise HTTPException(status_code=400, detail=f"Missing columns: {missing_cols}")

        # Reorder columns to match training and convert to float32
        df = df[EXPECTED_COLUMNS].astype("float32")

        # Make prediction
        probabilities = model.predict_proba(df)
        positive_probabilities = probabilities[:, 1]

        THRESHOLD = 0.3
        predictions = (positive_probabilities > THRESHOLD).astype(int).tolist()

        return {
            "probabilities": positive_probabilities.tolist(),
            "predictions": predictions
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
