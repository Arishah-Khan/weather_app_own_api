import express from "express";
import path from "path";
import cors from "cors";
import { weatherData } from "./weather-data.js";

const app = express();
const port = process.env.PORT || 3000;

const __dirname = path.resolve();
app.use(cors()); 
app.use("/", express.static(path.join(__dirname, "./weather-frontend/dist"))); 

app.get("/", (req, res) => {
  res.send("🌤️ Weather App Server is Running");
});


app.get("/api/weather/:cityName", (req, res) => {
  const cityName = req.params.cityName.toLowerCase();
  const cityWeather = weatherData.find(
    (data) => data.city.toLowerCase() === cityName
  );

  if (cityWeather) {
    res.json(cityWeather);
  } else {
    res.status(404).json({ message: "City not found in our database!" });
  }
});

app.use("*", (req, res) => {
  res.status(404).send("404 - Route Not Found");
});

app.listen(port, () => {
  console.log(`🚀 Server running on https://weatherappownapi-production.up.railway.app:${port}`);
});


