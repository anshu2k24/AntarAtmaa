"use client";

import { useEffect, useState } from "react";

interface SensorData {
  temperature: number;
  rainfall: number;
  soil_moisture: number;
  vib_rms: number;
  porepressure: number;
  displacement: number;
  timestamp: string;
}

interface PredictionResponse {
  rockfall_probabilities: number[];
  fusion_scores: number[];
  risk_levels: string[];
  yolo_detections: {
    class: string;
    confidence: number;
    bbox: number[];
  }[];
}

const SITE_ID = "68c95e7cc0f82d6249f8d6b4"; // 🔧 replace with dynamic later

export default function RiskDashboard() {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch sensor data
  const fetchSensorData = async () => {
    try {
      const res = await fetch(`/api/iot?siteId=${SITE_ID}`);
      if (!res.ok) throw new Error("Failed to fetch sensor data");
      const data = await res.json();
      setSensorData(data.data || []);
    } catch (err) {
      console.error("Error fetching sensor data:", err);
    }
  };

  // Run ML analysis
  const runAnalysis = async () => {
    if (sensorData.length === 0) return;

    setLoading(true);

    try {
      const latest = sensorData[0]; // latest entry
      const date = new Date(latest.timestamp);

      const payload = [
        {
          ...latest,
          center_lat: 45.0,
          center_lon: 7.0,
          dem_mean_elev: 500.0,
          dem_max_slope: 50.0,
          dem_mean_slope: 35.0,
          dem_aspect: 180.0,
          month: date.getMonth() + 1,
          day_of_week: date.getDay(),
          day_of_year: Math.ceil(
            (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) /
              (1000 * 60 * 60 * 24)
          ),
        },
      ];

      const formData = new FormData();
      formData.append("tabular_data", JSON.stringify(payload));
      if (file) formData.append("file", file);

      const res = await fetch("http://localhost:8000/rockfall/predict", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Prediction request failed");

      const result = await res.json();
      setPrediction(result);
    } catch (err) {
      console.error("Error in ML pipeline:", err);
    } finally {
      setLoading(false);
    }
  };

  // Auto refresh sensor data every 5 min
  useEffect(() => {
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 space-y-6 text-white">
      <h1 className="text-3xl font-bold">⛰️ Rockfall Risk Dashboard</h1>

      {/* Upload Section */}
      <div className="space-y-2">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full text-sm text-gray-400
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-600 file:text-white
                     hover:file:bg-blue-500"
        />
        <button
          onClick={runAnalysis}
          disabled={loading}
          className="px-4 py-2 bg-green-600 rounded hover:bg-green-500"
        >
          {loading ? "Analyzing..." : "Run Analysis"}
        </button>
      </div>

      {/* Latest Sensor Data */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Latest Sensor Data</h2>
        {sensorData.length > 0 ? (
          <pre className="text-sm bg-gray-900 p-3 rounded overflow-x-auto">
            {JSON.stringify(sensorData[0], null, 2)}
          </pre>
        ) : (
          <p className="text-gray-400">No sensor data available</p>
        )}
      </div>

      {/* Prediction Results */}
      {prediction && (
        <div className="bg-gray-800 p-4 rounded-lg space-y-3">
          <h2 className="text-xl font-semibold">Prediction Results</h2>
          <p>
            <strong>Risk Levels:</strong>{" "}
            {prediction.risk_levels.join(", ")}
          </p>
          <p>
            <strong>Probabilities:</strong>{" "}
            {prediction.rockfall_probabilities.map((p) => p.toFixed(2)).join(", ")}
          </p>
          <p>
            <strong>Fusion Scores:</strong>{" "}
            {prediction.fusion_scores.map((s) => s.toFixed(2)).join(", ")}
          </p>
          <div>
            <strong>Detections:</strong>
            <pre className="text-sm bg-gray-900 p-3 rounded overflow-x-auto">
              {JSON.stringify(prediction.yolo_detections, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
