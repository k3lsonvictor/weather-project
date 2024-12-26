'use client';
import { WeatherContextProvider } from "../Layout/Structure/generalContext";
import { WeatherSection } from "./WeatherSection";
import useWeatherReducer from '../Layout/Structure/generalReducer';

export const WeatherArea = () => {
    const WeatherState = useWeatherReducer();

    return (
        <WeatherContextProvider value={WeatherState}>
            <WeatherSection />
        </WeatherContextProvider>
    )
}