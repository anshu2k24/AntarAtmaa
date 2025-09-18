/*
  All-in-one ESP32 sensor hub
  - I2C: SDA=21, SCL=22
  - ICM-2060x raw driver
  - HX711: DT=32, SCK=33 (load cell)
  - HC-SR04: TRIG=25, ECHO=26
  - Capacitive Soil Moisture Sensor: Analog Pin (e.g., GPIO34)
*/

#include <Wire.h>
#include "HX711.h"
#include <math.h> // For sqrt()
#include <WiFi.h>
#include <HTTPClient.h>

// ---------- Wi-Fi and Server Configuration ----------
const char* ssid = "";
const char* password = "";
const char* serverUrl = "";

// ---------- ICM-2060x (raw registers) ----------
#define ICM_ADDR      0x68
#define WHO_AM_I      0x75
#define PWR_MGMT_1    0x6B
#define ACCEL_XOUT_H  0x3B
#define GYRO_XOUT_H   0x43

// Sensitivities (assume default ±2g, ±250 dps)
const float ACCEL_SENS = 16384.0f; // LSB/g
const float GRAVITY    = 9.80665f; // m/s^2 per g

// ---------- HX711 ----------
#define LOADCELL_DOUT_PIN 32
#define LOADCELL_SCK_PIN  33
HX711 scale;
// IMPORTANT: A smaller CALIBRATION_FACTOR increases sensitivity.
// This value is a placeholder; you may need to calibrate it for your specific load cell.
const float CALIBRATION_FACTOR = 42.0f; 
// New constant to make the pore pressure reading more sensitive
const float POREPRESSURE_SENSITIVITY = 10.0f;

// ---------- Ultrasonic ----------
#define TRIG_PIN 25
#define ECHO_PIN 26

// ---------- Soil Moisture ----------
#define SOIL_MOISTURE_PIN 34 // GPIO34 is a common choice for analog input

// ---------- JSON Configuration ----------
const char* SITE_ID = "68c95e7cc0f82d6249f8d6b4";
const unsigned long READ_INTERVAL_MS = 10000; // 10 seconds

// ---------- Timing ----------
unsigned long lastRead = 0;

// ---------- Helper I2C functions for ICM ----------
void writeRegister(uint8_t reg, uint8_t val) {
  Wire.beginTransmission(ICM_ADDR);
  Wire.write(reg);
  Wire.write(val);
  Wire.endTransmission();
}

int16_t read16(uint8_t reg) {
  Wire.beginTransmission(ICM_ADDR);
  Wire.write(reg);
  Wire.endTransmission(false);
  Wire.requestFrom(ICM_ADDR, (uint8_t)2, (uint8_t)true);
  int16_t hi = Wire.read();
  int16_t lo = Wire.read();
  return (hi << 8) | lo;
}

// ---------- Ultrasonic helper ----------
long readUltrasonicCM() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  unsigned long dur = pulseIn(ECHO_PIN, HIGH, 30000UL);
  if (dur == 0) return -1;
  long dist = (long)(dur * 0.034 / 2.0);
  return dist;
}

// Function to get sensor data and send it to the server
void sendDataToServer() {
  // ---- ICM-2060x readings ----
  int16_t ax_raw = read16(ACCEL_XOUT_H);
  int16_t ay_raw = read16(ACCEL_XOUT_H + 2);
  int16_t az_raw = read16(ACCEL_XOUT_H + 4);
  float ax_ms2 = (ax_raw / ACCEL_SENS) * GRAVITY;
  float ay_ms2 = (ay_raw / ACCEL_SENS) * GRAVITY;
  float az_ms2 = (az_raw / ACCEL_SENS) * GRAVITY;
  float vib_rms = sqrt(ax_ms2 * ax_ms2 + ay_ms2 * ay_ms2 + az_ms2 * az_ms2);

  // ---- Soil Moisture sensor reading (direct from ESP32 ADC) ----
  int soil_raw = analogRead(SOIL_MOISTURE_PIN);
  float soil_moisture_pct = map(soil_raw, 2500, 1000, 0, 100); // Calibrate this!

  // ---- HX711 load cell ----
  float weight_g = 0.0f;
  if (scale.is_ready()) {
    weight_g = scale.get_units(10);
  }
  float porepressure = weight_g * POREPRESSURE_SENSITIVITY;

  // ---- Ultrasonic ----
  long displacement_cm = readUltrasonicCM();

  // ---- Placeholders ----
  float temperature = 25.5; 
  float rainfall = 0.0;

  // ---- Build JSON payload ----
  String jsonPayload = "{\"siteId\":\"";
  jsonPayload += SITE_ID;
  jsonPayload += "\",\"temperature\":";
  jsonPayload += String(temperature, 2);
  jsonPayload += ",\"rainfall\":";
  jsonPayload += String(rainfall, 2);
  jsonPayload += ",\"soil_moisture\":";
  jsonPayload += String(soil_moisture_pct, 2);
  jsonPayload += ",\"vib_rms\":";
  jsonPayload += String(vib_rms, 2);
  jsonPayload += ",\"porepressure\":";
  jsonPayload += String(porepressure, 2);
  jsonPayload += ",\"displacement\":";
  jsonPayload += String(displacement_cm, 2);
  jsonPayload += "}";

  // ---- Send data via HTTP POST ----
  HTTPClient http;
  http.begin(serverUrl);
  http.addHeader("Content-Type", "application/json");

  Serial.println("Sending JSON payload to server...");
  int httpResponseCode = http.POST(jsonPayload);
  
  if (httpResponseCode > 0) {
    Serial.printf("HTTP Response code: %d\n", httpResponseCode);
    String payload = http.getString();
    Serial.println(payload);
  } else {
    Serial.printf("Error code: %d\n", httpResponseCode);
  }
  http.end();
}

void setup() {
  Serial.begin(115200);
  delay(200);
  Wire.begin(21, 22);

  // Initialize Wi-Fi
  Serial.print("Connecting to WiFi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println(" Connected!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());

  // Initialize ICM-2060x
  Wire.beginTransmission(ICM_ADDR);
  Wire.write(WHO_AM_I);
  Wire.endTransmission(false);
  Wire.requestFrom(ICM_ADDR, (uint8_t)1, (uint8_t)true);
  if (Wire.available() && Wire.read() == 0x70) {
    writeRegister(PWR_MGMT_1, 0x00);
    Serial.println(F("✅ ICM-2060x found"));
  } else {
    Serial.println(F("❌ ICM-2060x not found!"));
  }
  
  // HX711 init
  scale.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);
  if (!scale.is_ready()) {
    Serial.println(F("❌ HX711 not found"));
  } else {
    Serial.println(F("✅ HX711 found"));
    scale.set_scale(CALIBRATION_FACTOR);
    scale.tare();
  }

  // Ultrasonic and Soil Moisture pins
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(SOIL_MOISTURE_PIN, INPUT);

  Serial.println(F("Setup complete. Starting loop..."));
  delay(200);
}

void loop() {
  unsigned long now = millis();
  if (now - lastRead >= READ_INTERVAL_MS) {
    lastRead = now;
    if (WiFi.status() == WL_CONNECTED) {
      sendDataToServer();
    } else {
      Serial.println("WiFi not connected. Retrying...");
    }
  }
}
