"use client";

import { useEffect, useReducer } from "react";
import { WeekWeatherData, } from '@/app/hooks/useWeatherData';
import { getWeather } from "@/app/api/callers/weather";

export interface TemperatureData {
  temperature: string;
  time: string;
  weatherCode: number | null;
}
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

export interface WeatherStateProps {
  loadingState: WeatherLoadingState;

  lastTemperature: TemperatureData;
  temperatureAlongDay: { value: { temperature: number; weatherCode: number | null }; label: string }[];
  weekWeather: WeekWeatherData[];
  timezone: string | null;

  params: {
    latitude: number;
    longitude: number;
    locality: string;
  };
}

export interface WeatherResultProps extends WeatherStateProps {
  setLoadingState: (loading: WeatherLoadingState) => void;
  setParams: (params: { latitude: number, longitude: number, locality: string | null }) => void;
  fetchTemperatureData: (params: { latitude: number, longitude: number, locality: string }) => void;
}

export enum WeatherLoadingState {
  FIRST_LOAD,
  IDLE,
  FETCHING,
  REFETCHING,
}

export enum WeatherActionTypes {
  SET_LOADING_STATE,
  SET_PARAMS,
  SET_LAST_TEMPERATURE,
  SET_TEMPERATURE_ALONG_DAY,
  SET_WEEK_WEATHER,
  SET_TIMEZONE,  
}

export interface WeatherActionProps {
  type: WeatherActionTypes;
  payload: any;
}

export const WeatherStateInitialValues: WeatherStateProps = {
  lastTemperature: {
    temperature: "",
    time: "",
    weatherCode: null,
  },
  temperatureAlongDay: [],
  weekWeather: [],
  timezone: null,
  params: {
    latitude: 0,
    longitude: 0,
    locality: "America/Sao_Paulo",
  },
  loadingState: WeatherLoadingState.FIRST_LOAD,
}

const reducer = (state: WeatherStateProps, action: WeatherActionProps) => {
  console.log('Action received:', action);
  switch (action.type) {
    case WeatherActionTypes.SET_LOADING_STATE:
      console.log('Setting loading state:', action.payload);
      return {
        ...state,
        loadingState: action.payload,
      };
    case WeatherActionTypes.SET_LAST_TEMPERATURE:
      console.log('Setting last temperature:', action.payload);
      return {
        ...state,
        lastTemperature: action.payload,
      };
    case WeatherActionTypes.SET_TEMPERATURE_ALONG_DAY:
      console.log('Setting temperature along day:', action.payload);
      return {
        ...state,
        temperatureAlongDay: action.payload,
      };
    case WeatherActionTypes.SET_WEEK_WEATHER:
      console.log('Setting week weather:', action.payload);
      return {
        ...state,
        weekWeather: action.payload,
      };
    case WeatherActionTypes.SET_TIMEZONE:
      console.log('Setting timezone:', action.payload);
      return {
        ...state,
        timezone: action.payload,
      };
    case WeatherActionTypes.SET_PARAMS:
      console.log('Setting params:', action.payload);
      return {
        ...state,
        params: action.payload,
      };
    default:
      return state;
  }
};

export default function useWeatherReducer(): WeatherResultProps {
  const [state, dispatch] = useReducer(reducer, WeatherStateInitialValues);

  const now = new Date();
  const currentDate = now.toISOString().split('T')[0]; // Data atual no formato YYYY-MM-DD
  const endDate = new Date();
  endDate.setDate(now.getDate() + 7);
  const endDateString = endDate.toISOString().split('T')[0];

  const setLoadingState = (loading: WeatherLoadingState) => {
    dispatch({ type: WeatherActionTypes.SET_LOADING_STATE, payload: loading });
  }

  const setTimezone = (timezone: string) => {
    dispatch({ type: WeatherActionTypes.SET_TIMEZONE, payload: timezone });
  }

  const setLastTemperature = (lastTemperature: TemperatureData) => {
    dispatch({ type: WeatherActionTypes.SET_LAST_TEMPERATURE, payload: lastTemperature });
  }

  const setTemperatureAlongDay = (temperatureAlongDay: { value: { temperature: number; weatherCode: number | null }; label: string }[]) => {
    dispatch({ type: WeatherActionTypes.SET_TEMPERATURE_ALONG_DAY, payload: temperatureAlongDay });
  }

  const setWeekWeather = (weekWeather: WeekWeatherData[]) => {
    dispatch({ type: WeatherActionTypes.SET_WEEK_WEATHER, payload: weekWeather });
  }

  const setParams = (params: {
    latitude: number;
    longitude: number;
    locality: string | null;
  }) => {
    console.log('Setting params:', params);
    dispatch({ type: WeatherActionTypes.SET_PARAMS, payload: params });
  }

  const fetchTemperatureData = async (params: { latitude: number, longitude: number, locality: string }) => {
    const AParams = {
      latitude: params.latitude,
      longitude: params.longitude,
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
      timezone: params.locality ? params.locality : 'America/Sao_Paulo',
      start_date: currentDate,
      end_date: endDateString,
    };
    try {
      setLoadingState(WeatherLoadingState.FETCHING);
      const response = await getWeather(AParams);
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
          return { value: { temperature: item.temperature, weatherCode: item.weatherCode }, label: date.getHours() + 'h' };
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
    } finally {
      setLoadingState(WeatherLoadingState.IDLE);
    }
  }

  console.log(state.params, state.lastTemperature, state.temperatureAlongDay, state.weekWeather, state.timezone);

  useEffect(()=>{
    if(state.loadingState === WeatherLoadingState.FIRST_LOAD){
      fetchTemperatureData(state.params);
    }
  }, [state.loadingState, state.params]);

  // Atualiza o estado de carregamento quando os parâmetros mudam
  // useEffect(() => {
  //   console.log('Atualizando parâmetros');
  //   console.log(state.lastTemperature)
  // }, [state.params]);

  return {
    ...state,
    setParams,
    setLoadingState,
    fetchTemperatureData,
  }
}
