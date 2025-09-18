from ultralytics import YOLO

model = YOLO("runs/detect/cracks_v14/weights/best.pt")  # trained weights
results = model.predict("cracked.png", save=True, conf=0.25)
