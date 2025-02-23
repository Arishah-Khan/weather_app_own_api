import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const availableCities = [
  "Karachi", "Lahore", "Islamabad", "Quetta", "Peshawar",
  "Multan", "Faisalabad", "Rawalpindi", "Hyderabad", "Gilgit"
];

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/weather/${city}`);
      setWeatherData(response.data);
      setError("");
    } catch (err) {
      console.error("API Error:", err.response?.data || err.message);
      Swal.fire({
        icon: "error",
        title: "City Not Found",
        text: `You can only search for: ${availableCities.join(", ")}`,
      });
      setWeatherData(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-8 flex flex-col items-center">
      <h1 className="text-5xl font-extrabold text-white text-center mb-10 drop-shadow-lg">🌦️ Weather Explorer</h1>
      <div className="flex flex-col sm:flex-row justify-center w-full max-w-2xl gap-4 mb-5">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-3 rounded-lg w-full sm:w-2/3 focus:ring-2 focus:ring-pink-400 shadow-md"
        />
        <button
          onClick={fetchWeather}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white px-4 py-2 rounded-lg w-full sm:w-auto shadow-lg"
        >
          Get Weather
        </button>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-xl max-w-lg w-full mx-auto mb-5">
        <h2 className="text-2xl font-bold mb-3 text-center text-pink-600">Available Cities 🌍</h2>
        <p className="text-gray-700 text-center">{availableCities.join(", ")}</p>
      </div>

      {error && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-500 text-white p-4 rounded-xl text-center w-full max-w-lg shadow-lg">
          {error}
        </motion.div>
      )}

      {weatherData && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-lg mx-auto">
          <h2 className="text-3xl font-semibold mb-5 text-center text-purple-600">{weatherData.city} - Current Weather</h2>
          <ul className="space-y-3 text-lg">
            <li>🌡️ Temperature: {weatherData.temperature}°C</li>
            <li>🌥️ Condition: {weatherData.condition}</li>
            <li>💧 Humidity: {weatherData.humidity}%</li>
            <li>🔥 Feels Like: {weatherData.feels_like}°C</li>
            <li>💨 Wind Speed: {weatherData.wind_speed}</li>
            <li>📈 Pressure: {weatherData.pressure}</li>
            <li>👁️ Visibility: {weatherData.visibility}</li>
            <li>🌅 Sunrise: {weatherData.sunrise}</li>
            <li>🌇 Sunset: {weatherData.sunset}</li>
          </ul>
        </motion.div>
      )}
    </div>
  );
}
