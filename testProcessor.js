
const { generateSensorData } = require("./sensorSimulator");
const { processSensorData } = require("./dataProcessor");

const sensorData = generateSensorData();

const results = processSensorData(sensorData);

console.log(JSON.stringify(results, null, 2));
