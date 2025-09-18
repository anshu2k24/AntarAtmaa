
  # Gani: AI-Powered Rockfall Prediction & Mine Safety System
  
  Welcome to **Gani**, an innovative solution by **Team Antaratmaa** for **SIH 2025**.
  Our platform uses **AI + IoT** to improve safety and operational efficiency in open-pit mines by predicting rockfall incidents *before* they occur.
  
  > **Gani** (Kannada for *“mine”*) isn’t just a web app—it’s a **proactive guardian** for miners and mine sites.
  
  ---
  
  ##   Problem Statement
  
  Rockfalls in open-pit mining are **unpredictable, hazardous, and costly**.
  Traditional methods (manual inspections, proprietary systems) are:
  
  * **Reactive** instead of preventive
  * **Expensive** to deploy & maintain
  * **Limited** in predictive capability
  
  This leaves mines vulnerable to **accidents, downtime, and heavy financial losses**.
  
  ---
  
  ##   Our Solution
  
  **Gani** delivers an **end-to-end intelligent platform** that fuses **real-time IoT sensor data** with **AI-driven predictive analytics**.
  It enables mines to be **safer, smarter, and more resilient**.
  
  ---
  
  ##    Key Features
  
  ###   AI-Powered Prediction
  
  * Core model: `rockfall_sensor_environment_model.js`
  * Trained on **Digital Elevation Models (DEMs)**, **drone imagery**, and **sensor data**
  * Identifies **early warning patterns** of rockfall events
  
  ###   IoT Sensor Network
  
  Low-cost sensors (`iot/`) monitor:
  
  * 🌧 Rainfall
  * 🌡 Temperature
  * 📈 Vibration (RMS)
  * 📉 Displacement
  * 💧 Pore Pressure
  
  ###   Interactive Dashboard
  
  Built with **Next.js + Tailwind**, featuring:
  
  * Live & historical **sensor data**
  * **Weather forecasts** (real-time + 5-day)
  * **AI-driven risk maps**
  * **Email/SMS alerts** (Low, Medium, High severity)
  
  ###   User Management
  
  * Multi-level roles: Organization, Site, Employee
  * Secure data handling with **MongoDB + backend APIs**
  * Unified **single source of truth** for all mine data
  
  ---
  
  ## 🖥️ Tech Stack
  
  **Frontend**: ![Next.js](https://skillicons.dev/icons?i=nextjs) ![Tailwind](https://skillicons.dev/icons?i=tailwind)
  **Backend**: ![Node.js](https://skillicons.dev/icons?i=nodejs) ![MongoDB](https://skillicons.dev/icons?i=mongodb)
  **Machine Learning**: ![Python](https://skillicons.dev/icons?i=python) XGBoost, LSTM, YOLOv8
  **IoT Hardware**: ESP32, MPU6050, Rain Sensor, MQ135, HX711 + Load Cell, ADS1115, Soil Moisture Sensor
  **Alerts**: Twilio (SMS), Nodemailer (Email)
  
  ---
  
  ##   Getting Started
  
  ###   Prerequisites
  
  * Node.js `v18+`
  * Python `v3.9+`
  * MongoDB Atlas account
  * OpenWeatherMap API key
  * Pre-trained Rockfall Prediction Model (`.pt` file)
  
  ### 📂 Setup
  
  **1. Clone Repository**
  
  ```bash
  git clone [repository-url]
  cd antaratmaa
  ```
  
  **2. Backend Setup**
  
  ```bash
  cd backend
  npm install
  cp .env.example .env
  # Add MongoDB URI + other env vars
  npm start
  ```
  
  **3. Frontend Setup**
  
  ```bash
  cd ../web-app
  npm install
  cp .env.example .env.local
  # Add NEXT_PUBLIC_OPENWEATHER_KEY
  npm run dev
  ```
  
  **4. ML Model Setup**
  
  ```bash
  cd ../ml
  # Place your .pt models (e.g., vision_rocks_cracks.pt)
  python ml_pred.py
  ```
  
  ---
  
  ##   Quick Run Commands
  
  ```bash
  # Run frontend
  git clone [repository-url] && cd antaratmaa/web-app && npm i && npm run dev
  
  # Run ML prediction
  cd antaratmaa/ml && pip install -r requirements.txt && python ml_pred.py
  ```
  
  ---
  
  ##   Python Dependencies
  
  Install:
  
  ```bash
  pip install uvicorn pandas xgboost fastapi ultralytics pillow
  ```
  
  Used in project:
  
  ```python
  import uvicorn
  import pandas as pd
  import xgboost as xgb
  from fastapi import FastAPI, HTTPException, UploadFile, File, Form
  from fastapi.middleware.cors import CORSMiddleware
  from ultralytics import YOLO
  from PIL import Image
  import io, json
  ```
  
  ---
  
  ## 🗂 Folder Structure
  
  ```
  ├── backend/    # Node.js API, data mgmt, auth
  ├── frontend/   # Next.js web app
  ├── ml/         # ML models, datasets, training scripts
  └── iot/        # IoT sensor integration
  ```
  
  ---
  
  ## 👨‍💻 Team Antaratmaa
  
  We are passionate innovators with expertise in **AI, web dev, and IoT**—working to transform mining safety.
  **Mission:** Make mining safer, smarter, and sustainable.
  
  ---
  
  ##   Contact
  
  For collaborations & inquiries:
    \[mail2panshu@gmail.com]
  
  ---
  
  ⚡ Built with vision, passion, and impact for **SIH 2025**.
=======
# Gani: AI-Powered Rockfall Prediction & Mine Safety System

Welcome to **Gani**, an innovative solution by **Team Antaratmaa** for **SIH 2025**.
Our platform uses **AI + IoT** to improve safety and operational efficiency in open-pit mines by predicting rockfall incidents *before* they occur.

> **Gani** (Kannada for *“mine”*) isn’t just a web app—it’s a **proactive guardian** for miners and mine sites.

---

##   Problem Statement

Rockfalls in open-pit mining are **unpredictable, hazardous, and costly**.
Traditional methods (manual inspections, proprietary systems) are:

* **Reactive** instead of preventive
* **Expensive** to deploy & maintain
* **Limited** in predictive capability

This leaves mines vulnerable to **accidents, downtime, and heavy financial losses**.

---

##   Our Solution

**Gani** delivers an **end-to-end intelligent platform** that fuses **real-time IoT sensor data** with **AI-driven predictive analytics**.
It enables mines to be **safer, smarter, and more resilient**.

---

##    Key Features

###   AI-Powered Prediction

* Core model: `rockfall_sensor_environment_model.js`
* Trained on **Digital Elevation Models (DEMs)**, **drone imagery**, and **sensor data**
* Identifies **early warning patterns** of rockfall events

###   IoT Sensor Network

Low-cost sensors (`iot/`) monitor:

* 🌧 Rainfall
* 🌡 Temperature
* 📈 Vibration (RMS)
* 📉 Displacement
* 💧 Pore Pressure

###   Interactive Dashboard

Built with **Next.js + Tailwind**, featuring:

* Live & historical **sensor data**
* **Weather forecasts** (real-time + 5-day)
* **AI-driven risk maps**
* **Email/SMS alerts** (Low, Medium, High severity)

###   User Management

* Multi-level roles: Organization, Site, Employee
* Secure data handling with **MongoDB + backend APIs**
* Unified **single source of truth** for all mine data

---

## 🖥️ Tech Stack

**Frontend**: ![Next.js](https://skillicons.dev/icons?i=nextjs) ![Tailwind](https://skillicons.dev/icons?i=tailwind)
**Backend**: ![Node.js](https://skillicons.dev/icons?i=nodejs) ![MongoDB](https://skillicons.dev/icons?i=mongodb)
**Machine Learning**: ![Python](https://skillicons.dev/icons?i=python) XGBoost, LSTM, YOLOv8
**IoT Hardware**: ESP32, MPU6050, Rain Sensor, MQ135, HX711 + Load Cell, ADS1115, Soil Moisture Sensor
**Alerts**: Twilio (SMS), Nodemailer (Email)

---

##   Getting Started

###   Prerequisites

* Node.js `v18+`
* Python `v3.9+`
* MongoDB Atlas account
* OpenWeatherMap API key
* Pre-trained Rockfall Prediction Model (`.pt` file)

### 📂 Setup

**1. Clone Repository**

```bash
git clone [repository-url]
cd antaratmaa
```

**2. Backend Setup**

```bash
cd backend
npm install
cp .env.example .env
# Add MongoDB URI + other env vars
npm start
```

**3. Frontend Setup**

```bash
cd ../web-app
npm install
cp .env.example .env.local
# Add NEXT_PUBLIC_OPENWEATHER_KEY
npm run dev
```

**4. ML Model Setup**

```bash
cd ../ml
# Place your .pt models (e.g., vision_rocks_cracks.pt)
python ml_pred.py
```

---

##   Quick Run Commands

```bash
# Run frontend
git clone [repository-url] && cd antaratmaa/web-app && npm i && npm run dev

# Run ML prediction
cd antaratmaa/ml && pip install -r requirements.txt && python ml_pred.py
```

---

##   Python Dependencies

Install:

```bash
pip install uvicorn pandas xgboost fastapi ultralytics pillow
```

Used in project:

```python
import uvicorn
import pandas as pd
import xgboost as xgb
from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
from PIL import Image
import io, json
```

---

## 🗂 Folder Structure

```
├── backend/    # Node.js API, data mgmt, auth
├── frontend/   # Next.js web app
├── ml/         # ML models, datasets, training scripts
└── iot/        # IoT sensor integration
```

---

## 👨‍💻 Team Antaratmaa

We are passionate innovators with expertise in **AI, web dev, and IoT**—working to transform mining safety.
**Mission:** Make mining safer, smarter, and sustainable.

---

##   Contact

For collaborations & inquiries:
  \[mail2panshu@gmail.com]

---

⚡ Built with vision, passion, and impact for **SIH 2025**.
