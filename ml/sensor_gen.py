# import pandas as pd
# import numpy as np
# from datetime import datetime, timedelta
# import os
#
# # ===== CONFIG =====
# patch_csv = "processed_dems/mine_dataset.csv"  # DEM-derived patches
# out_timeseries = "processed_dems/timeseries_synthetic.csv"
#
# start_year = 2020
# end_year = 2024
#
# # Sensor ranges & thresholds (tweak as needed)
# TEMP_RANGE = (25, 35)
# RAIN_WET_RANGE = (40, 80)
# RAIN_DRY_RANGE = (5, 30)
# SOIL_MOISTURE_MIN, SOIL_MOISTURE_MAX = 0.2, 0.8
# VIB_RMS_MAX = 2.5
# PORE_PRESSURE_MAX = 100
# DISPLACEMENT_SAFE = 5     # mm threshold under which safe
# DISPLACEMENT_RISK = 15    # threshold over which risk high
#
# # Load patch info
# df_patches = pd.read_csv(patch_csv)
#
# records = []
# for _, row in df_patches.iterrows():
#     patch_id = row["patch_id"]
#     slope_mean = row["dem_mean_slope"]
#     elev = row["dem_mean_elev"]
#     aspect = row["dem_aspect"]
#     # maybe use slope_mean as risk factor
#
#     for yr in range(start_year, end_year + 1):
#         for month in range(1, 13):
#             # decide rainfall based on month
#             if month in [6,7,8,9]:
#                 # main monsoon
#                 rain = np.random.uniform(*RAIN_WET_RANGE)
#             elif month in [10,11]:
#                 rain = np.random.uniform(10, 50)  # moderate post-monsoon
#             else:
#                 rain = np.random.uniform(*RAIN_DRY_RANGE)
#
#             # temperature
#             temp = np.random.uniform(*TEMP_RANGE)
#             # soil moisture increases with rain
#             soil_moisture = min(SOIL_MOISTURE_MAX, max(SOIL_MOISTURE_MIN,
#                                         0.2 + (rain / 100) * 0.6
#                                         + np.random.normal(0, 0.05)))
#             # pore pressure depends on soil moisture & slope
#             pore_pressure = min(PORE_PRESSURE_MAX,
#                                   10
#                                   + soil_moisture * 100
#                                   + slope_mean * 2
#                                   + np.random.normal(0,5))
#             # vibration (vib_rms)
#             vib_rms = max(0, 0.2 + (slope_mean / 50) + (rain / 80) + np.random.normal(0, 0.2))
#             # displacement
#             displacement = max(0, (pore_pressure / 50) * (slope_mean / 20) * rain/50 + np.random.normal(0,2))
#
#             # label: risky if displacement > threshold & vib high
#             label = 1 if (displacement > DISPLACEMENT_RISK and vib_rms > 1.5) else 0
#
#             timestamp = f"{yr}-{month:02d}-01"
#
#             records.append({
#                 "patch_id": patch_id,
#                 "timestamp": timestamp,
#                 "temperature": round(temp,2),
#                 "rainfall": round(rain,2),
#                 "soil_moisture": round(soil_moisture,3),
#                 "vib_rms": round(vib_rms,3),
#                 "porepressure": round(pore_pressure,2),
#                 "displacement": round(displacement,2),
#                 "label_rockfall_within_month": label
#             })
#
# # Save
# df_ts = pd.DataFrame(records)
# df_ts.to_csv(out_timeseries, index=False)
# print(f"✅ Timeseries synthetic saved at {out_timeseries} with {len(df_ts)} rows")

import pandas as pd
import numpy as np
from datetime import datetime
import os

# ===== CONFIG =====
patch_csv = "processed_dems/mine_dataset.csv"  # DEM-derived patches
out_timeseries = "processed_dems/timeseries_synthetic.csv"

start_year = 2020
end_year = 2024

# Sensor ranges
TEMP_RANGE = (25, 35)
RAIN_WET_RANGE = (40, 80)
RAIN_DRY_RANGE = (5, 30)
SOIL_MOISTURE_MIN, SOIL_MOISTURE_MAX = 0.2, 0.8
PORE_PRESSURE_MAX = 100

# Load patch info
df_patches = pd.read_csv(patch_csv)

records = []
for _, row in df_patches.iterrows():
    patch_id = row["patch_id"]
    slope_mean = row["dem_mean_slope"]
    elev = row["dem_mean_elev"]
    aspect = row["dem_aspect"]

    for yr in range(start_year, end_year + 1):
        for month in range(1, 13):
            # Rainfall (seasonal)
            if month in [6,7,8,9]:  # monsoon
                rain = np.random.uniform(*RAIN_WET_RANGE)
            elif month in [10,11]:
                rain = np.random.uniform(10, 50)
            else:
                rain = np.random.uniform(*RAIN_DRY_RANGE)

            # Temperature
            temp = np.random.uniform(*TEMP_RANGE)

            # Soil moisture (linked to rain)
            soil_moisture = min(SOIL_MOISTURE_MAX, max(SOIL_MOISTURE_MIN,
                0.2 + (rain / 100) * 0.6 + np.random.normal(0, 0.05)))

            # Pore pressure
            pore_pressure = min(PORE_PRESSURE_MAX,
                10 + soil_moisture * 100 + slope_mean * 2 + np.random.normal(0, 5))

            # Vibration
            vib_rms = max(0, 0.2 + (slope_mean / 50) + (rain / 80) + np.random.normal(0, 0.2))

            # Displacement
            displacement = max(0, (pore_pressure / 50) * (slope_mean / 20) * rain/50 + np.random.normal(0, 2))

            # ---- RISK SCORE ----
            slope_factor = slope_mean / 20
            rain_factor = rain / 100
            vib_factor = vib_rms / 2.5
            disp_factor = displacement / 10
            pore_factor = pore_pressure / 100

            risk_score = (0.3*slope_factor + 0.25*rain_factor +
                          0.2*vib_factor + 0.15*disp_factor +
                          0.1*pore_factor)

            risk_score = max(0, min(1, risk_score))
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
                "risk_score": round(risk_score, 3)  # keep for debugging
            })

# Save
df_ts = pd.DataFrame(records)
df_ts.to_csv(out_timeseries, index=False)
print(f"✅ Timeseries synthetic saved at {out_timeseries} with {len(df_ts)} rows")
print(df_ts['label_rockfall_within_month'].value_counts(normalize=True))
