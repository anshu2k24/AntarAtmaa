import pandas as pd
import numpy as np

patch_csv = "processed_dems/mine_dataset.csv"  # DEM-derived patches
out_timeseries = "processed_dems/timeseries_synthetic_v2.csv"

start_year = 2020
end_year = 2024

# Sensor ranges
TEMP_RANGE = (25, 35)
RAIN_WET_RANGE = (40, 80)
RAIN_DRY_RANGE = (5, 30)
SOIL_MOISTURE_MIN, SOIL_MOISTURE_MAX = 0.2, 0.8
PORE_PRESSURE_MAX = 100


df_patches = pd.read_csv(patch_csv)

records = []
for _, row in df_patches.iterrows():
    patch_id = row["patch_id"]
    slope_mean = row["dem_mean_slope"]
    elev = row["dem_mean_elev"]
    aspect = row["dem_aspect"]

    # rolling memory for rainfall accumulation
    cumulative_rain = 0

    for yr in range(start_year, end_year + 1):
        for month in range(1, 13):
            # Rainfall (seasonal + extreme events)
            if month in [6, 7, 8, 9]:  # monsoon
                rain = np.random.uniform(*RAIN_WET_RANGE)
                if np.random.rand() < 0.05:  # 5% chance extreme event
                    rain += np.random.uniform(50, 120)  # cloudburst
            elif month in [10, 11]:
                rain = np.random.uniform(10, 50)
            else:
                rain = np.random.uniform(*RAIN_DRY_RANGE)

            # Temperature
            temp = np.random.uniform(*TEMP_RANGE)

            # Soil moisture (linked to rain + memory)
            soil_moisture = min(
                SOIL_MOISTURE_MAX,
                max(
                    SOIL_MOISTURE_MIN,
                    0.2 + (rain / 100) * 0.6 + np.random.normal(0, 0.05)
                )
            )

            # Pore pressure
            pore_pressure = min(
                PORE_PRESSURE_MAX,
                10 + soil_moisture * 100 + slope_mean * 2 + np.random.normal(0, 5)
            )

            # Vibration (noise heavy)
            vib_rms = max(
                0,
                0.2 + (slope_mean / 50) + (rain / 80) + np.random.normal(0, 0.3)
            )

            # Displacement
            displacement = max(
                0,
                (pore_pressure / 50) * (slope_mean / 20) * (rain / 50) + np.random.normal(0, 2)
            )

            # ---- Risk score (nonlinear & interactions) ----
            slope_factor = slope_mean / 20
            rain_factor = rain / 100
            vib_factor = vib_rms / 2.5
            disp_factor = displacement / 10
            pore_factor = pore_pressure / 100

            # rolling rainfall memory
            cumulative_rain = 0.7 * cumulative_rain + rain
            cum_rain_factor = min(1, cumulative_rain / 300)

            # pore + displacement high risk
            interaction = 0.3 * (pore_factor * disp_factor)

            risk_score = (
                    0.25 * slope_factor +
                    0.2 * rain_factor +
                    0.15 * vib_factor +
                    0.15 * disp_factor +
                    0.1 * pore_factor +
                    0.15 * cum_rain_factor +
                    interaction
            )

            # slope thresholds
            if slope_mean > 30:
                risk_score += 0.1
            elif slope_mean < 10:
                risk_score -= 0.1

            # clamp
            risk_score = max(0, min(1, risk_score))


            if slope_mean > 30 and rain > 70 and displacement > 5:
                label = 1
            elif risk_score > 0.8:
                label = 1
            else:
                label = 1 if np.random.rand() < risk_score else 0

            timestamp = f"{yr}-{month:02d}-01"

            records.append({
                "patch_id": patch_id,
                "timestamp": timestamp,
                "temperature": round(temp, 2),
                "rainfall": round(rain, 2),
                "soil_moisture": round(soil_moisture, 3),
                "vib_rms": round(vib_rms, 3),
                "porepressure": round(pore_pressure, 2),
                "displacement": round(displacement, 2),
                "label_rockfall_within_month": label,
                "risk_score": round(risk_score, 3)
            })

# Save
df_ts = pd.DataFrame(records)
df_ts.to_csv(out_timeseries, index=False)
print(f"Timeseries synthetic saved at {out_timeseries} with {len(df_ts)} rows")
print(df_ts['label_rockfall_within_month'].value_counts(normalize=True))
