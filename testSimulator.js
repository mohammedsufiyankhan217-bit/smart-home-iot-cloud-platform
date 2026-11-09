const { generateSensorData } = require("./sensorSimulator");

const data = generateSensorData();

console.log(JSON.stringify(data, null, 2));