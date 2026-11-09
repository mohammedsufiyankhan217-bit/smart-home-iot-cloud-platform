
function randomBetween(min, max) {
    return Number((Math.random() * (max - min) + min).toFixed(2));
}

function generateSensorData() {
    const timestamp = new Date().toISOString();

    const appliances = [
        {
            applianceId: "AC001",
            appliance: "Air Conditioner",
            readings: {
                roomTemperature: randomBetween(24, 35),
                targetTemperature: 24,
                powerConsumption: randomBetween(800, 2000),
                compressorStatus: Math.random() > 0.3 ? "ON" : "OFF"
            }
        },
        {
            applianceId: "REF001",
            appliance: "Refrigerator",
            readings: {
                internalTemperature: randomBetween(2, 10),
                doorStatus: Math.random() > 0.9 ? "OPEN" : "CLOSED",
                powerConsumption: randomBetween(100, 300)
            }
        },
        {
            applianceId: "WM001",
            appliance: "Washing Machine",
            readings: {
                waterConsumption: randomBetween(10, 60),
                vibration: randomBetween(0.1, 8),
                cycleStatus: ["IDLE", "WASHING", "RINSING", "SPINNING"][
                    Math.floor(Math.random() * 4)
                ],
                powerConsumption: randomBetween(200, 1200)
            }
        },
        {
            applianceId: "TV001",
            appliance: "Smart TV",
            readings: {
                operatingHours: randomBetween(0, 12),
                powerConsumption: randomBetween(1, 150),
                status: Math.random() > 0.3 ? "ON" : "STANDBY"
            }
        },
        {
            applianceId: "LIGHT001",
            appliance: "Smart Lighting",
            readings: {
                brightness: randomBetween(0, 100),
                status: Math.random() > 0.3 ? "ON" : "OFF",
                powerConsumption: randomBetween(0, 60)
            }
        },
        {
            applianceId: "WH001",
            appliance: "Water Heater",
            readings: {
                waterTemperature: randomBetween(25, 80),
                heatingStatus: Math.random() > 0.5 ? "ON" : "OFF",
                powerConsumption: randomBetween(0, 2000)
            }
        },
        {
            applianceId: "FAN001",
            appliance: "Smart Fan",
            readings: {
                speedLevel: Math.floor(randomBetween(0, 6)),
                motorTemperature: randomBetween(25, 75),
                powerConsumption: randomBetween(0, 80),
                status: Math.random() > 0.3 ? "ON" : "OFF"
            }
        },
        {
            applianceId: "MW001",
            appliance: "Microwave Oven",
            readings: {
                internalTemperature: randomBetween(20, 100),
                cookingTime: randomBetween(0, 30),
                doorStatus: Math.random() > 0.8 ? "OPEN" : "CLOSED",
                powerConsumption: randomBetween(0, 1500),
                status: Math.random() > 0.5 ? "ON" : "OFF"
            }
        },
        {
            applianceId: "LOCK001",
            appliance: "Smart Door Lock",
            readings: {
                lockStatus: Math.random() > 0.1 ? "LOCKED" : "UNLOCKED",
                batteryLevel: randomBetween(5, 100),
                failedAccessAttempts: Math.floor(randomBetween(0, 5))
            }
        },
        {
            applianceId: "WP001",
            appliance: "Water Purifier",
            readings: {
                waterQualityPPM: randomBetween(20, 250),
                filterLifeRemaining: randomBetween(0, 100),
                waterFlowRate: randomBetween(0, 3),
                powerConsumption: randomBetween(5, 60)
            }
        }
    ];

    return appliances.map(item => ({
        ...item,
        timestamp
    }));
}

module.exports = { generateSensorData };
