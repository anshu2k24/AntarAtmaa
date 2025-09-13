import pandas as pd
from sklearn.model_selection import train_test_split
from xgboost import XGBClassifier
from sklearn.metrics import classification_report, confusion_matrix
import matplotlib.pyplot as plt
from xgboost import plot_importance

model = XGBClassifier(
    n_estimators=500,
    learning_rate=0.05,
    max_depth=6,
    subsample=0.8,
    colsample_bytree=0.8,
    scale_pos_weight=3,
    eval_metric="logloss"
)

df_sensor = pd.read_csv("processed_dems/timeseries_synthetic_v2.csv")
df_dem = pd.read_csv("processed_dems/mine_dataset.csv")

df = df_sensor.merge(df_dem, on="patch_id", how="left")

#adding the below for month data to be considered in training
df['timestamp'] = pd.to_datetime(df['timestamp'])
df['month'] = df['timestamp'].dt.month
df['day_of_week'] = df['timestamp'].dt.dayofweek
df['day_of_year'] = df['timestamp'].dt.dayofyear

x = df.drop(columns=["risk_score","patch_id","label_rockfall_within_month", "timestamp"])
y = df["label_rockfall_within_month"]

x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, shuffle=True, stratify=y)

print(df.head())

model.fit(x_train, y_train)
# y_pred = model.predict(x_test)

y_probs = model.predict_proba(x_test)[:, 1]
y_pred = (y_probs > 0.3).astype(int)


print(classification_report(y_test, y_pred))
print(confusion_matrix(y_test, y_pred))

plot_importance(model, max_num_features=15)
plt.show()

# save
model.save_model("rockfall_model.json")
print("saved model")

# # load later
# from xgboost import XGBClassifier
# model = XGBClassifier()
# model.load_model("rockfall_model.json")
