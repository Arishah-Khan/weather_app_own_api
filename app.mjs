import express from "express";
import path from "path";
import cors from "cors";
import { weatherData } from "./weather-data.js";

const app = express();
const port = process.env.PORT || 3000;

// Static directory setup
const __dirname = path.resolve();
app.use(cors()); // Enable CORS
app.use("/", express.static(path.join(__dirname, "./weather-frontend/dist"))); 

// Home Route
app.get("/", (req, res) => {
  res.send("🌤️ Weather App Server is Running");
});

// Custom API Route - Serve Static Weather Data
app.get("/api/weather", (req, res) => {
  res.json(weatherData); // Sending all weather data
});

// Specific City Weather Route
app.get("/api/weather/:cityName", (req, res) => {
  const cityName = req.params.cityName.toLowerCase();
  const cityWeather = weatherData.find(
    (city) => city.city.toLowerCase() === cityName
  );

  if (cityWeather) {
    res.json(cityWeather);
  } else {
    res.status(404).json({ message: "City not found in our database!" });
  }
});

// 404 Route
app.use("*", (req, res) => {
  res.status(404).send("404 - Route Not Found");
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});


