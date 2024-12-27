import React from "react";
import { DailyCard } from './dailyCard';
import { WeekWeatherData } from "@/app/hooks/useWeatherData";
import useWeatherReducer from "../Layout/Structure/generalReducer";
import { SkeletonLoading } from "../Layout/Loadings/skeletonLoading";

interface WeekWeatherProps {
  weekWeather: WeekWeatherData[];
}

export const WeekWeather = ({
  weekWeather
}: WeekWeatherProps) => {
  const { loadingState } = useWeatherReducer();
  return (
    <div className="bg-[#0C101D] flex-1 rounded rounded-2xl w-auto h-full max-[730px]:h-auto font-oswald font-semibold flex flex-col justify-start items-start p-12 gap-12">
      <div>Previsão da semana</div>
      <div className="flex flex-col justify-between items-between gap-6 h-full">
        {loadingState === 1 ? weekWeather.map((dayWeather, index) => (
          <DailyCard key={index} {...dayWeather} />
        )) :
          <div className="flex flex-col justify-between h-full opacity-50">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonLoading key={index} height="!h-[20px] !p-0 mt-4" number={1} type={2} />
            ))}
          </div>}
      </div>
    </div>
  )
}