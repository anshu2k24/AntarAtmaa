from ultralytics import YOLO

if __name__ == "__main__":
    model = YOLO("yolov8n.pt")
    model.train(
        data="data.yaml",
        epochs=50,
        imgsz=640,
        batch=8,
        device=0,   # use GPU
        workers=0,  # <- optional, avoids multiprocessing headaches on Windows
        name="cracks_v1"
    )
