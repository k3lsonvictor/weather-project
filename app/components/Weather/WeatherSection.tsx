import { useEffect, useState } from "react";
import { useWeatherData } from '@/app/hooks/useWeatherData';
import { TodayWeather } from '../TodayWeather/todayWeather';
import { LastTemperatureCardNew } from '../LastTemperatureCard/lastTemperatureCardNew';
import { WeekWeather } from '../WeekWeather/weekWeather';
import useWeatherReducer from '../Layout/Structure/generalReducer';
import { getLocality } from "@/app/api/callers/locality";

export function WeatherSection() {
  const {temperatureAlongDay, weekWeather, timezone, fetchTemperatureData, lastTemperature} = useWeatherReducer();
  const [selectedLocality, setSelectedLocality] = useState<string | null>(null);

  useEffect(() => {
    console.log("aqui");
    getLocality({ q: selectedLocality ? selectedLocality : "São Paulo", format: "json", limit: 1 }).then((response) => {
      console.log(response.data[0].lat, response.data[0].lon);
      fetchTemperatureData({ latitude: response.data[0].lat, longitude: response.data[0].lon, locality: "America/Sao_Paulo" });
    });
  }, [selectedLocality]);


  return (
    <div className="flex flex-col md:grid md:grid-cols-[1fr_auto] h-full items-start p-8 gap-4 font-[family-name:var(--font-geist-sans)] text-white">
      <div className="flex flex-col gap-4 w-full h-auto md:h-full">
        <LastTemperatureCardNew
          setLocality={(e) => {
            setSelectedLocality(e);
          }}
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
