# import rasterio
# import numpy as np
# from rasterio.enums import Resampling
# from rasterio.plot import show
# import matplotlib.pyplot as plt
#
# with rasterio.open("processed_dems/dem_clipped.tif") as src:
#     dem = src.read(1, resampling=Resampling.bilinear)
#     transform = src.transform
#
# # Calculate slope
# x, y = np.gradient(dem, transform.a, transform.e)
# slope = np.arctan(np.sqrt(x*x + y*y)) * 180/np.pi   # convert radians → degrees
#
# plt.imshow(slope, cmap="terrain")
# plt.colorbar(label="Slope (degrees)")
# plt.title("Correct Slope Map - Donimalai")
# plt.show()



