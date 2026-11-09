require("dotenv").config();
const pool = require("./database");
const express = require("express");

const { generateSensorData } = require("./sensorSimulator");
const { processSensorData } = require("./dataProcessor");

const app = express();
app.use((req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
        console.log(
            `${new Date().toISOString()} | ${req.method} ${req.originalUrl} | Status: ${res.statusCode} | ${Date.now() - start}ms`
        );
    });

    next();
});
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

// Home route
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Generate simulated sensor readings
app.get("/api/sensors", (req, res) => {
    const sensorData = generateSensorData();

    res.json({
        message: "Sensor data generated successfully",
        data: sensorData
    });
});

// Process sensor readings

app.get("/api/process", async (req, res) => {
    try {
        const sensorData = generateSensorData();
        const results = processSensorData(sensorData);

        await pool.query(
            `INSERT INTO processing_history
            (total_appliances, normal_appliances, warning_appliances, total_power_consumption)
            VALUES ($1, $2, $3, $4)`,
            [
                results.summary.totalAppliances,
                results.summary.normalAppliances,
                results.summary.warningAppliances,
                results.summary.totalPowerConsumption
            ]
        );

        res.json({
            message: "IoT data processed and saved successfully",
            results: results
        });

    } catch (error) {
        console.error("Processing Error:", error);

        res.status(500).json({
            message: "IoT processing failed",
            error: error.message
        });
    }
});
// Retrieve processing history from PostgreSQL
app.get("/api/history", async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM processing_history
             ORDER BY id DESC
             LIMIT 5`
        );

        res.json({
            message: "Processing history retrieved successfully",
            history: result.rows
        });

    } catch (error) {
        console.error("History Retrieval Error:", error);

        res.status(500).json({
            message: "Failed to retrieve processing history",
            error: error.message
        });
    }
});

// Upload IoT sensor data to AWS S3
const { uploadSensorData } = require("./s3Storage");

app.get("/api/upload", async (req, res) => {
    try {
        const sensorData = generateSensorData();

        const fileName = await uploadSensorData(sensorData);

        res.json({
            message: "IoT sensor data uploaded successfully to AWS S3",
            bucket: "smart-home-iot-data-sufiyan-2026",
            fileName: fileName
        });

    } catch (error) {
        console.error("S3 Upload Error:", error);

        res.status(500).json({
            message: "Failed to upload sensor data",
            error: error.message
        });
    }
});
app.get("/api/db-test", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.json({
            message: "PostgreSQL connected successfully!",
            databaseTime: result.rows[0].now
        });
    } catch (error) {
        console.error("Database connection error:", error);

        res.status(500).json({
            message: "Database connection failed",
            error: error.message
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
