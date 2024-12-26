import React from "react";
import { DailyCard } from './dailyCard';
import { WeekWeatherData } from "@/app/hooks/useWeatherData";

interface WeekWeatherProps {
  weekWeather: WeekWeatherData[];
}

export const WeekWeather = ({
  weekWeather
}: WeekWeatherProps) => {
  return (
    <div className="bg-[#0C101D] flex-1 rounded rounded-2xl w-auto h-full max-[730px]:h-auto font-oswald font-semibold flex flex-col justify-start items-start p-12 gap-12">
      <div>Previsão da semana</div>
      <div className="flex flex-col justify-between items-between gap-6 h-full">
        {weekWeather.map((dayWeather, index) => (
          <DailyCard key={index} {...dayWeather} />
        ))}
      </div>
    </div>
  )
}