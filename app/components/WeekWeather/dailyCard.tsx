import React from "react";
import { WeekWeatherData } from '../../hooks/useWeatherData';
import codesWeather from '../../utils/codesWeather.json';

export const DailyCard = ({
  maxTemp,
  minTemp,
  daylightDuration,
  sunshineDuration,
  precipitationSum,
  rainSum,
  showersSum,
  dayName,
  weatherCode
}
  : WeekWeatherData) => {
  return (
    <div className="grid grid-cols-3 gap-6 font-light w-full border-b-2 border-white/20 pb-2">
      <div>{dayName}</div>
      <div className="flex gap-2 items-center">
        <i className={`wi wi-${codesWeather.weatherCodes.find(code => code.code === weatherCode)?.icon || "Unknown"}`}></i>
        <div className="max-w-[100px]">{codesWeather.weatherCodes.find(code => code.code === weatherCode)?.summary || "Unknown"}</div>
      </div>
      <div className="text-center hidden md:flex">{maxTemp.toFixed(0)}/{minTemp.toFixed(0)}</div>
    </div>
  )
}