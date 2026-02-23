LOW = 190
HIGH = 250

def snn_detect(voltage):
    # Spike-based decision (simplified SNN logic)
    if voltage < LOW or voltage > HIGH:
        return True
    return False

