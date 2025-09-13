import uvicorn
from fastapi import FastAPI, UploadFile, File
from ultralytics import YOLO
from PIL import Image
import io
import os

# Init FastAPI
app = FastAPI()

# Load your trained YOLO model (cracks + loose rocks)
MODEL_PATH = "runs/detect/cracks_rocks_v1/weights/best.pt"
model = YOLO(MODEL_PATH)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/detect")
async def detect(file: UploadFile = File(...)):
    """
    Upload an image and get detections for cracks & loose rocks.
    """
    # Read image into memory
    contents = await file.read()
    img = Image.open(io.BytesIO(contents))

    # Run inference
    results = model.predict(img, conf=0.25)

    # Convert results to JSON format
    detections = []
    for r in results:
        boxes = r.boxes.xyxy.tolist()  # [x1, y1, x2, y2]
        confs = r.boxes.conf.tolist()
        classes = r.boxes.cls.tolist()

        for box, conf, cls in zip(boxes, confs, classes):
            detections.append({
                "class": model.names[int(cls)],
                "confidence": float(conf),
                "bbox": [float(x) for x in box]
            })

    return {"detections": detections}


if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
