import { useQuery } from 'react-query';
import { getWeather } from '../api/callers/weather';
import { useEffect, useState } from 'react';

// Tipos para os dados da API
interface Hourly {
  timestamp: Date;
  temperature: number;
  weatherCode: number;
}

interface Daily {
  weatherCode: number;
  maxTemperature: number;
  minTemperature: number;
  daylightDuration: number;
  sunshineDuration: number;
  precipitationSum: number;
  rainSum: number;
  showersSum: number;
  windSpeed: number;
  windDirection: number;
  uvIndex: number;
}

interface WeatherResponse {
  timezone: string;
  hourly: Hourly[];
  daily: Daily[];
}

interface TemperatureData {
  temperature: string;
  time: string;
  weatherCode: number | null;
}

export interface WeekWeatherData {
  weatherCode: number;
  maxTemp: number;
  minTemp: number;
  daylightDuration: number;
  sunshineDuration: number;
  precipitationSum: number;
  rainSum: number;
  showersSum: number;
  dayName: string;
  windSpeed: number;
  windDirection: number;
  uvIndex: number;
}

export function useWeatherData(latitude?: number, longitude?: number, locality?: string | null) {

  const [lastTemperature, setLastTemperature] = useState<TemperatureData>({ temperature: '', time: '', weatherCode: null });
  const [temperatureAlongDay, setTemperatureAlongDay] = useState<{ value: {temperature: number, weatherCode: number | null}, label: string }[]>([]);
  const [weekWeather, setWeekWeather] = useState<WeekWeatherData[]>([]);
  const [timezone, setTimezone] = useState<string | null>('');
  const now = new Date();
  const currentDate = now.toISOString().split('T')[0]; // Data atual no formato YYYY-MM-DD
  const endDate = new Date();
  endDate.setDate(now.getDate() + 7);
  const endDateString = endDate.toISOString().split('T')[0];

  console.log(latitude, longitude, locality);

  const params = {
    latitude: latitude ? latitude : -23.533773,
    longitude: longitude ? longitude : -46.62529,
    hourly: ['temperature_2m', 'weather_code'],
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'daylight_duration',
      'sunshine_duration',
      'uv_index_max',
      'precipitation_sum',
      'rain_sum',
      'showers_sum',
      'snowfall_sum',
      'wind_speed_10m_max',
      'wind_direction_10m_dominant',
    ],
    timezone: locality ? locality : 'America/Sao_Paulo',
    start_date: currentDate,
    end_date: endDateString,
  };

  useEffect(() => {
    const fetchTemperatureData = async () => {
      try {
        const response = await getWeather(params);
        if (!response) {
          console.log('Sem dados disponíveis');
          return;
        }

        const timezone = response.timezone;
        setTimezone(timezone ? timezone.replace(/_/g, ' ') : '');

        const first24Hours = (data: Hourly[]) => {
          return data.slice(0, 24);
        };

        const currentWeather = first24Hours(response.hourly);

        function filterByCurrentDateTime(data: Hourly[]): Hourly[] {
          const now = new Date();
          const currentDate = now.toISOString().split('T')[0];
          const currentHour = now.getUTCHours();

          return data.filter((item) => {
            const itemDate = new Date(item.timestamp).toISOString().split('T')[0];
            const itemHour = new Date(item.timestamp).getUTCHours();
            return itemDate === currentDate && itemHour === currentHour;
          });
        }

        const currentTemperature = filterByCurrentDateTime(currentWeather);
        const date = new Date(currentTemperature[0].timestamp);

        console.log(currentTemperature)

        setLastTemperature({
          temperature: currentTemperature[0].temperature.toFixed(0).toString(),
          time: date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }) + ` ${date.getHours()}h`,
          weatherCode: response.daily[0].weatherCode,
        });

        setTemperatureAlongDay(
          currentWeather.map((item) => {
            const date = new Date(item.timestamp);
            return { value: {temperature: item.temperature, weatherCode: item.weatherCode}, label: date.getHours() + 'h' };
          })
        );

        const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        const todayIndex = new Date().getDay();

        setWeekWeather(
          response.daily.map((item: any, index: number) => {
            const dayName = index === 0 ? 'Hoje' : daysOfWeek[(todayIndex + index) % 7];
            return {
              weatherCode: item.weatherCode,
              maxTemp: item.maxTemperature,
              minTemp: item.minTemperature,
              daylightDuration: item.daylightDuration,
              sunshineDuration: item.sunshineDuration,
              precipitationSum: item.precipitationSum,
              rainSum: item.rainSum,
              showersSum: item.showersSum,
              dayName,
              windSpeed: item.windSpeed,
              windDirection: item.windDirection,
              uvIndex: item.uvIndex,
            };
          })
        );
      } catch (error: unknown) {
        console.log('Erro ao buscar dados');
        console.error(error);
      }
    };

    fetchTemperatureData();
  }, []);

  return { lastTemperature, temperatureAlongDay, weekWeather, timezone };
}
