const {
    S3Client,
    PutObjectCommand,
    GetObjectCommand
} = require("@aws-sdk/client-s3");

const s3 = new S3Client({
    region: "ap-southeast-2"
});

const BUCKET_NAME = "smart-home-iot-data-sufiyan-2026";

// Upload IoT sensor data to S3
async function uploadSensorData(data) {
    const fileName = `sensor-data/${Date.now()}.json`;

    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: JSON.stringify(data, null, 2),
        ContentType: "application/json"
    });

    await s3.send(command);

    return fileName;
}

module.exports = { uploadSensorData };