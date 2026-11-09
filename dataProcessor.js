
function processSensorData(sensorData) {
    const processedData = [];
    
    for (const device of sensorData) {
        const readings = device.readings;
        const alerts = [];

        // Air Conditioner
        if (device.applianceId === "AC001") {
            if (readings.roomTemperature > 32) {
                alerts.push("Room temperature is unusually high");
            }
            if (readings.powerConsumption > 1800) {
                alerts.push("High AC power consumption");
            }
        }

        // Refrigerator
        if (device.applianceId === "REF001") {
            if (readings.internalTemperature > 8) {
                alerts.push("Refrigerator temperature is too high");
            }
            if (readings.doorStatus === "OPEN") {
                alerts.push("Refrigerator door is open");
            }
        }

        // Washing Machine
        if (device.applianceId === "WM001") {
            if (readings.vibration > 6.5) {
                alerts.push("Abnormal washing machine vibration");
            }
            if (readings.waterConsumption > 50) {
                alerts.push("High water consumption");
            }
        }

        // Smart TV
        if (device.applianceId === "TV001") {
            if (readings.operatingHours > 10) {
                alerts.push("TV has been operating for extended hours");
            }
        }

        // Smart Lighting
        if (device.applianceId === "LIGHT001") {
            if (readings.brightness > 95 && readings.status === "OFF") {
                alerts.push("Brightness and lighting status mismatch");
            }
        }

        // Water Heater
        if (device.applianceId === "WH001") {
            if (readings.waterTemperature > 70) {
                alerts.push("Water temperature is unusually high");
            }
            if (readings.powerConsumption > 1800) {
                alerts.push("High water heater power consumption");
            }
        }

        // Smart Fan
        if (device.applianceId === "FAN001") {
            if (readings.motorTemperature > 65) {
                alerts.push("Fan motor temperature is high");
            }
        }

        // Microwave Oven
        if (device.applianceId === "MW001") {
            if (readings.status === "ON" && readings.doorStatus === "OPEN") {
                alerts.push("Microwave is ON while its door is open");
            }
            if (readings.powerConsumption > 1400) {
                alerts.push("High microwave power consumption");
            }
        }

        // Smart Door Lock
        if (device.applianceId === "LOCK001") {
            if (readings.batteryLevel < 20) {
                alerts.push("Smart lock battery is low");
            }
            if (readings.failedAccessAttempts >= 3) {
                alerts.push("Multiple failed door access attempts");
            }
        }

        // Water Purifier
        if (device.applianceId === "WP001") {
            if (readings.waterQualityPPM > 150) {
                alerts.push("Water quality requires attention");
            }
            if (readings.filterLifeRemaining < 20) {
                alerts.push("Water purifier filter needs replacement");
            }
        }

        processedData.push({
            ...device,
            processingStatus: alerts.length > 0 ? "WARNING" : "NORMAL",
            alerts: alerts
        });
    }

    const totalAppliances = processedData.length;
    const normalAppliances = processedData.filter(
        item => item.processingStatus === "NORMAL"
    ).length;

    const warningAppliances = processedData.filter(
        item => item.processingStatus === "WARNING"
    ).length;

    const totalPowerConsumption = processedData.reduce(
        (total, item) => total + (item.readings.powerConsumption || 0),
        0
    );

    return {
        summary: {
            totalAppliances,
            normalAppliances,
            warningAppliances,
            totalPowerConsumption: Number(totalPowerConsumption.toFixed(2))
        },
        appliances: processedData
    };
}

module.exports = { processSensorData };
