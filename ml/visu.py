import rasterio
import matplotlib.pyplot as plt

with rasterio.open("processed_dems/hillshade.tif") as src:
    slope = src.read(1)
    plt.imshow(slope, cmap="terrain")
    plt.colorbar(label="Slope (degrees)")
    plt.show()
