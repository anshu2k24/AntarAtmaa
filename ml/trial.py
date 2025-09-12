import rasterio
from rasterio.mask import mask
from shapely.geometry import box, mapping
from osgeo import gdal
import numpy as np
import pandas as pd
from datetime import datetime
import os
import matplotlib.pyplot as plt

# ========= CONFIG =========
raw_dem_path = "./dem data/P5_PAN_CD_N15_000_E076_000_DEM_30m.tif"
out_dir = "processed_dems"
os.makedirs(out_dir, exist_ok=True)

# Bounding box for Donimalai Mine (Karnataka)
bbox = {
    "west": 76.35,
    "south": 15.00,
    "east": 76.45,
    "north": 15.10
}

# ========= STEP 1: CLIP TO BBOX =========
with rasterio.open(raw_dem_path) as src:
    geom = box(bbox["west"], bbox["south"], bbox["east"], bbox["north"])
    out_image, out_transform = mask(src, [mapping(geom)], crop=True)
    out_meta = src.meta.copy()

out_meta.update({
    "driver": "GTiff",
    "height": out_image.shape[1],
    "width": out_image.shape[2],
    "transform": out_transform
})

clipped_dem = os.path.join(out_dir, "dem_clipped.tif")
with rasterio.open(clipped_dem, "w", **out_meta) as dest:
    dest.write(out_image)

print(f"✅ Clipped DEM saved at {clipped_dem}")

# ========= STEP 2: REPROJECT TO UTM =========
reproj_dem = os.path.join(out_dir, "dem_utm.tif")
gdal.Warp(reproj_dem, clipped_dem, dstSRS="EPSG:32643")  # UTM Zone 43N
print(f"✅ Reprojected DEM saved at {reproj_dem}")

# ========= STEP 3: DERIVE FEATURES =========
slope_path = os.path.join(out_dir, "slope.tif")
aspect_path = os.path.join(out_dir, "aspect.tif")
hillshade_path = os.path.join(out_dir, "hillshade.tif")

gdal.DEMProcessing(slope_path, reproj_dem, "slope", format="GTiff")
gdal.DEMProcessing(aspect_path, reproj_dem, "aspect", format="GTiff")
gdal.DEMProcessing(hillshade_path, reproj_dem, "hillshade", format="GTiff")

print("✅ Derived slope, aspect, and hillshade TIFFs")

# ========= STEP 4: PATCH → CSV =========
csv_path = os.path.join(out_dir, "mine_dataset.csv")
PATCH_SIZE = 100  # meters

# Open sources
dem_src = rasterio.open(reproj_dem)
slope_src = rasterio.open(slope_path)
aspect_src = rasterio.open(aspect_path)

transform = dem_src.transform
res = dem_src.res[0]  # pixel resolution in meters

records = []
patch_id = 0

for row in range(0, dem_src.height, PATCH_SIZE // int(res)):
    for col in range(0, dem_src.width, PATCH_SIZE // int(res)):

        # Window bounds
        window = rasterio.windows.Window(
            col, row,
            PATCH_SIZE // int(res),
            PATCH_SIZE // int(res)
        )
        bounds = rasterio.windows.bounds(window, transform)

        # Read patches
        dem_patch = dem_src.read(1, window=window, boundless=True, fill_value=np.nan)
        slope_patch = slope_src.read(1, window=window, boundless=True, fill_value=np.nan)
        aspect_patch = aspect_src.read(1, window=window, boundless=True, fill_value=np.nan)

        if np.isnan(dem_patch).all():
            continue

        # Center coords
        # center_lon = (bounds.left + bounds.right) / 2
        # center_lat = (bounds.top + bounds.bottom) / 2
        # Center coords
        # Window bounds
        # bounds = rasterio.windows.bounds(window, transform)
        left, bottom, right, top = bounds

        # Center coords
        center_lon = (left + right) / 2
        center_lat = (top + bottom) / 2

        # Stats
        dem_mean_elev = float(np.nanmean(dem_patch))
        dem_max_slope = float(np.nanmax(slope_patch))
        dem_mean_slope = float(np.nanmean(slope_patch))
        dem_aspect = float(np.nanmean(aspect_patch))

        records.append({
            "patch_id": patch_id,
            "center_lat": center_lat,
            "center_lon": center_lon,
            "timestamp": datetime.utcnow().isoformat(),
            "dem_mean_elev": dem_mean_elev,
            "dem_max_slope": dem_max_slope,
            "dem_mean_slope": dem_mean_slope,
            "dem_aspect": dem_aspect,
            "image_path": None,
            "rain_6h": None,
            "soil_moisture_mean_6h": None,
            "vib_rms_6h": None,
            "porepressure_mean_6h": None,
            "displacement_6h": None,
            "label_rockfall_within_24h": None
        })
        patch_id += 1

# Save
df = pd.DataFrame(records)
df.to_csv(csv_path, index=False)
print(f"✅ CSV saved at {csv_path} with {len(df)} patches")

# ========= STEP 5: PREVIEW =========
with rasterio.open(slope_path) as src:
    slope = src.read(1)
plt.imshow(slope, cmap="terrain", vmin=0, vmax=60)
plt.colorbar(label="Slope (degrees)")
plt.title("Slope Map - Donimalai (corrected)")
plt.show()
