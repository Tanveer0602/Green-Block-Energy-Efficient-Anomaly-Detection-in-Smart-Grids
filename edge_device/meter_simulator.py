import random

def generate_meter_data():
    voltage = random.normalvariate(220, 3)

    # Inject anomaly
    if random.random() < 0.08:
        voltage = random.choice([150, 270])
        voltage = random.choice([150, 270])

    return voltage
