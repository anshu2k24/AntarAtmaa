from ultralytics import YOLO

model = YOLO("runs/detect/cracks_rocks_v1/weights/best.pt")  # trained weights
results = model.predict("rock loose.jpg", save=True, conf=0.25)
