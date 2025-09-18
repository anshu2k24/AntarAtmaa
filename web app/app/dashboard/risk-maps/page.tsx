"use client";

import { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

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
  createdAt?: string;
  _id?: string;
}

const SITE_ID = "68c95e7cc0f82d6249f8d6b4";

export default function RiskDashboard() {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [predictions, setPredictions] = useState<PredictionResponse[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  
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


  const fetchPredictions = async () => {
    try {
      const res = await fetch(`/api/prediction?siteId=${SITE_ID}`);
      if (!res.ok) throw new Error("Failed to fetch predictions");
      const data = await res.json();
      setPredictions(data.data || []);
    } catch (err) {
      console.error("Error fetching predictions:", err);
    }
  };


  const runAnalysis = async () => {
    if (sensorData.length === 0) return;
    setLoading(true);

    try {
      const latest = sensorData[0];
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

  
      const saveRes = await fetch("http://localhost:3000/api/prediction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteId: SITE_ID, ...result }),
      });
      if (!saveRes.ok) throw new Error("Failed to save prediction");
      const savedPrediction = await saveRes.json();

      
      await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteId: SITE_ID,
          prediction: { ...result, _id: savedPrediction.data._id },
          level: result.risk_levels[0] || "Low",
        }),
      });

     
      fetchPredictions();
    } catch (err) {
      console.error("Error in ML pipeline:", err);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchSensorData();
    fetchPredictions();
    const interval = setInterval(() => {
      fetchSensorData();
      fetchPredictions();
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

 
  const timestamps = predictions
    .map((p) => (p.createdAt ? new Date(p.createdAt).toLocaleTimeString() : "N/A"))
    .reverse();

  const probData = {
    labels: timestamps,
    datasets: [
      {
        label: "Rockfall Probability",
        data: predictions.map((p) => p.rockfall_probabilities[0] || 0).reverse(),
        borderColor: "#a67c52", 
        backgroundColor: "rgba(166,124,82,0.3)",
      },
    ],
  };

  const riskLevelsCount = {
    Low: predictions.filter((p) => p.risk_levels.includes("Low")).length,
    Medium: predictions.filter((p) => p.risk_levels.includes("Medium")).length,
    High: predictions.filter((p) => p.risk_levels.includes("High")).length,
  };

  const riskData = {
    labels: ["Low", "Medium", "High"],
    datasets: [
      {
        label: "Risk Level Count",
        data: [riskLevelsCount.Low, riskLevelsCount.Medium, riskLevelsCount.High],
        backgroundColor: ["#22c55e", "#eab308", "#ef4444"],
      },
    ],
  };

  return (
    <div className="p-6 space-y-6 text-gray-800 bg-[#f2f0ea] min-h-screen">
      <h1 className="text-3xl font-bold mb-4"> Rockfall Risk Dashboard</h1>

     
      <div className="flex items-center gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full text-sm text-gray-600
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-orange-500 file:text-white
            hover:file:bg-orange-400"
        />
        <button
          onClick={runAnalysis}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
        >
          {loading ? "Analyzing..." : "Run Analysis"}
        </button>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-3">Latest Sensor Data</h2>
          {sensorData.length > 0 ? (
            <ul className="space-y-1 text-sm text-gray-700">
              {Object.entries(sensorData[0]).map(([key, value]) =>
                key !== "timestamp" ? (
                  <li
                    key={key}
                    className="flex justify-between border-b border-gray-300 py-1"
                  >
                    <span className="capitalize">{key.replace("_", " ")}:</span>
                    <span className="font-mono">{value as number}</span>
                  </li>
                ) : null
              )}
            </ul>
          ) : (
            <p className="text-gray-500">No sensor data available</p>
          )}
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-3">Latest Prediction</h2>
          {predictions.length > 0 ? (
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <strong>Risk:</strong>{" "}
                <span
                  className={`${
                    predictions[0].risk_levels.includes("High")
                      ? "text-red-500"
                      : predictions[0].risk_levels.includes("Medium")
                      ? "text-yellow-400"
                      : "text-green-400"
                  }`}
                >
                  {predictions[0].risk_levels.join(", ")}
                </span>
              </p>
              <p>
                <strong>Probability:</strong>{" "}
                {(predictions[0].rockfall_probabilities[0] * 100).toFixed(1)}%
              </p>
              <p>
                <strong>Fusion Score:</strong>{" "}
                {predictions[0].fusion_scores[0]?.toFixed(2) || "-"}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">No predictions yet</p>
          )}
        </div>
      </div>

     
      {predictions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h2 className="text-xl mb-3">📈 Rockfall Probability Over Time</h2>
            <Line data={probData} />
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h2 className="text-xl mb-3">📊 Risk Level Distribution</h2>
            <Bar data={riskData} />
          </div>
        </div>
      )}

     
      {predictions.length > 0 && (
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h2 className="text-xl mb-3">Recent Predictions</h2>
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="py-2">Time</th>
                <th>Risk</th>
                <th>Probability</th>
                <th>Fusion Score</th>
              </tr>
            </thead>
            <tbody>
              {predictions.slice(0, 5).map((p, i) => (
                <tr key={i} className="border-b border-gray-200">
                  <td className="py-2">
                    {p.createdAt
                      ? new Date(p.createdAt).toLocaleTimeString()
                      : "-"}
                  </td>
                  <td>
                    <span
                      className={`${
                        p.risk_levels.includes("High")
                          ? "text-red-500"
                          : p.risk_levels.includes("Medium")
                          ? "text-yellow-400"
                          : "text-green-400"
                      }`}
                    >
                      {p.risk_levels.join(", ")}
                    </span>
                  </td>
                  <td>{(p.rockfall_probabilities[0] * 100).toFixed(1)}%</td>
                  <td>{p.fusion_scores[0]?.toFixed(2) || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}