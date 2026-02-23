import time
import requests
import random

METER_ID = "MTR_101"
BACKEND_URL = "http://localhost:5000/report-anomaly"

LOW = 190
HIGH = 250

def generate_voltage():
    voltage = random.normalvariate(220, 3)

    # Force anomaly sometimes
    if random.random() < 0.2:
        voltage = random.choice([150, 270])

    return voltage

def snn_detect(voltage):
    return voltage < LOW or voltage > HIGH


while True:
    voltage = generate_voltage()
    print(f"[EDGE] Voltage = {voltage:.2f}V")

    if snn_detect(voltage):
        print("⚠️  ANOMALY DETECTED AT EDGE")

        event = {
            "meter_id": METER_ID,
            "type": "Voltage Anomaly"
        }

        try:
            response = requests.post(BACKEND_URL, json=event)
            print("🔐 Sent to backend → blockchain")
            print("Backend response:", response.json())
        except Exception as e:
            print("❌ Failed to send:", e)

        print("-" * 40)
        time.sleep(5)

    time.sleep(1)
