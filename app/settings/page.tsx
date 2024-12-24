"use client";
import { useWeatherData } from "../hooks/useWeatherData";
import { TodayWeather } from "../components/TodayWeather/todayWeather";
import { LastTemperatureCardNew } from "../components/LastTemperatureCard/lastTemperatureCardNew";
import { WeekWeather } from "../components/WeekWeather/weekWeather";

export default function Home() {
  const { lastTemperature, temperatureAlongDay, maxAndMinTemperature, weekWeather, timezone } = useWeatherData(52.52, 13.41);

  return (
    <div className="flex flex-col md:grid md:grid-cols-[1fr_auto] h-full items-start p-8 gap-4 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-4 w-full h-full">
        <LastTemperatureCardNew
          lastTemperature={lastTemperature}
          timezone={timezone}
        />
        <TodayWeather
          temperatureAlongDay={temperatureAlongDay}
          maxAndMinTemperature={maxAndMinTemperature}
        />
      </div>
      <div className="w-full h-full">
        <WeekWeather
          weekWeather={weekWeather}
        />
      </div>
    </div>
  );
}
