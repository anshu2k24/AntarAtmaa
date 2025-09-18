"use client";

import { useState, useEffect, useMemo } from "react";
import { FaExclamationCircle, FaClock, FaUsers } from "react-icons/fa";
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

const AlertsPage = () => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [siteId, setSiteId] = useState<string | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem("siteId");
    if (storedId) setSiteId(storedId);
  }, []);

  const fetchAlerts = async () => {
    if (!siteId) return;
    try {
      const res = await fetch(`/api/alert?siteId=${siteId}`);
      if (!res.ok) throw new Error("Failed to fetch alerts");
      const data = await res.json();
      setAlerts(data.data || []);
    } catch (err) {
      console.error("Error fetching alerts:", err);
    }
  };

  useEffect(() => {
    if (!siteId) return;
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [siteId]);

  const getBorderColor = (level: string) => {
    switch (level) {
      case "High": return "#ef4444"; // red
      case "Medium": return "#eab308"; // yellow
      case "Low": return "#22c55e"; // green
      default: return "#6b7280"; // gray fallback
    }
  };

  // Chart: Alert Trends (count per date by level)
  const trendData = useMemo(() => {
    const counts: Record<string, { Low: number; Medium: number; High: number }> = {};
    alerts.forEach((a) => {
      const date = new Date(a.createdAt).toLocaleDateString();
      if (!counts[date]) counts[date] = { Low: 0, Medium: 0, High: 0 };
      counts[date][a.level] += 1;
    });

    const labels = Object.keys(counts);
    return {
      labels,
      datasets: [
        { label: "Low", data: labels.map((d) => counts[d].Low), borderColor: "#22c55e", backgroundColor: "rgba(34,197,94,0.3)" },
        { label: "Medium", data: labels.map((d) => counts[d].Medium), borderColor: "#eab308", backgroundColor: "rgba(234,179,8,0.3)" },
        { label: "High", data: labels.map((d) => counts[d].High), borderColor: "#ef4444", backgroundColor: "rgba(239,68,68,0.3)" },
      ],
    };
  }, [alerts]);

  // Chart: Distribution (total count of each level)
  const distributionData = useMemo(() => {
    const counts = { Low: 0, Medium: 0, High: 0 };
    alerts.forEach((a) => counts[a.level] += 1);

    return {
      labels: ["Low", "Medium", "High"],
      datasets: [
        {
          label: "Alerts Distribution",
          data: [counts.Low, counts.Medium, counts.High],
          backgroundColor: ["#22c55e", "#eab308", "#ef4444"],
        },
      ],
    };
  }, [alerts]);

  return (
    <div className="p-6 space-y-8 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold">🚨 Alerts & Notifications</h1>
      <p className="text-gray-400">Live updates from site predictions</p>

      {/* Charts */}
      {alerts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-lg mb-3">📈 Alert Trends</h2>
            <Line data={trendData} />
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-lg mb-3">📊 Alert Distribution</h2>
            <Bar data={distributionData} />
          </div>
        </div>
      )}

      {/* Alerts List */}
      {!siteId ? (
        <p className="text-yellow-500">⚠️ No site selected.</p>
      ) : alerts.length === 0 ? (
        <p className="text-gray-400">No alerts found for this site.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {alerts.map((alert) => (
            <div
              key={alert._id}
              className="bg-gray-800 p-6 rounded-lg shadow-lg border-l-4 relative"
              style={{ borderColor: getBorderColor(alert.level) }}
            >
              {/* SOS Button */}
              <button className="absolute top-4 right-4 px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700">
                SOS
              </button>

              <h2 className="text-xl font-semibold text-white flex items-center">
                <FaExclamationCircle className="mr-2" />
                {alert.level} Alert
              </h2>

              <p className="text-sm text-gray-400 mt-2">{alert.message}</p>

              <div className="mt-3 text-xs text-gray-500 space-y-1">
                <p className="flex items-center">
                  <FaClock className="mr-2" />
                  {new Date(alert.createdAt).toLocaleString()}
                </p>
                {alert.sentTo?.length > 0 && (
                  <p className="flex items-center">
                    <FaUsers className="mr-2" />
                    Sent to: {alert.sentTo.join(", ")}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlertsPage;
