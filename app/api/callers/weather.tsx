import { fetchWeatherApi } from "openmeteo";
// import { request } from "../apiRequester";

export interface WeatherRequest {
  longitude: number;
  latitude: number;
  hourly?: string[];
  daily?: string[];
  start_date?: string;
  end_date?: string;
}

export interface WeatherResponse {
  temperature: number;
  timestamp: string;
}

export const getWeather = async (params: WeatherRequest) => {
  const responses = await fetchWeatherApi("https://api.open-meteo.com/v1/forecast", params);
  if (!responses) {
    throw new Error("No response from weather API");
    return;
  };

  const response = responses[0];
  const utcOffsetSeconds = response.utcOffsetSeconds();
  const hourly = response.hourly()!;
  const daily = response.daily()!;
  const timezone = response.timezone();

  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {

    hourly: {
      time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
        (t) => new Date((t + utcOffsetSeconds) * 1000)
      ),
      temperature2m: hourly.variables(0)!.valuesArray()!,
      relativeHumidity2m: hourly.variables(1)!.valuesArray()!,
      weatherCode: hourly.variables(1)!.valuesArray()!,
    },
    daily: {
      time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
        (t) => new Date((t + utcOffsetSeconds) * 1000)
      ),
      weatherCode: daily.variables(0)!.valuesArray()!,
      temperature2mMax: daily.variables(1)!.valuesArray()!,
      temperature2mMin: daily.variables(2)!.valuesArray()!,
      daylightDuration: daily.variables(3)!.valuesArray()!,
      sunshineDuration: daily.variables(4)!.valuesArray()!,
      uvIndexMax: daily.variables(5)!.valuesArray()!,
      precipitationSum: daily.variables(6)!.valuesArray()!,
      rainSum: daily.variables(7)!.valuesArray()!,
      showersSum: daily.variables(8)!.valuesArray()!,
      snowfallSum: daily.variables(9)!.valuesArray()!,
      windSpeed10mMax: daily.variables(10)!.valuesArray()!,
      windDirection10mDominant: daily.variables(11)!.valuesArray()!,
    },

  };


  console.log(weatherData);

  return {
    hourly: weatherData.hourly.time.map((timestamp, i) => ({
      timestamp,
      temperature: weatherData.hourly.temperature2m[i],
      cloudCover: weatherData.hourly.relativeHumidity2m[i],
      weatherCode: weatherData.hourly.weatherCode[i],
    })),
    daily: weatherData.daily.time.map((timestamp, i) => ({
      timestamp,
      weatherCode: weatherData.daily.weatherCode[i],
      daylightDuration: weatherData.daily.daylightDuration[i],
      sunshineDuration: weatherData.daily.sunshineDuration[i],
      maxTemperature: weatherData.daily.temperature2mMax[i],
      minTemperature: weatherData.daily.temperature2mMin[i],
      precipitationSum: weatherData.daily.precipitationSum[i],
      rainSum: weatherData.daily.rainSum[i],
      showersSum: weatherData.daily.showersSum[i],
      windSpeed: weatherData.daily.windSpeed10mMax[i],
      windDirection: weatherData.daily.windDirection10mDominant[i],
      uvIndex: weatherData.daily.uvIndexMax[i]
    })),
    timezone: timezone,
  };
}