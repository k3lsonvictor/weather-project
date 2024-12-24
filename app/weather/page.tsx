"use client";
import { useWeatherData } from "../hooks/useWeatherData";
import { TodayWeather } from "../components/TodayWeather/todayWeather";
import { LastTemperatureCardNew } from "../components/LastTemperatureCard/lastTemperatureCardNew";
import { WeekWeather } from "../components/WeekWeather/weekWeather";

export default function Home() {
  const { lastTemperature, temperatureAlongDay, weekWeather, timezone } = useWeatherData(52.52, 13.41);

  console.log(weekWeather[0]?.windSpeed,
    weekWeather[0]?.windDirection,
    weekWeather[0]?.uvIndex,
    weekWeather[0]?.sunshineDuration)

  return (
    <div className="flex flex-col md:grid md:grid-cols-[1fr_auto] h-full items-start p-8 gap-4 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-4 w-full h-full">
        <LastTemperatureCardNew
          lastTemperature={lastTemperature}
          timezone={timezone}
        />
        <TodayWeather
          temperatureAlongDay={temperatureAlongDay}
          weatherInfoDay={{
            windSpeed: weekWeather[0]?.windSpeed,
            windDirection: weekWeather[0]?.windDirection,
            uvIndex: weekWeather[0]?.uvIndex,
            maxTemperature: weekWeather[0]?.maxTemp
          }}
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
