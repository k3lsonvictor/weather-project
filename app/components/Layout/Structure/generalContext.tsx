import { createContext, useContext } from "react";
import { WeatherResultProps, WeatherStateInitialValues } from "./generalReducer";

const context = createContext<WeatherResultProps>({
  ...WeatherStateInitialValues,
  setLoadingState: () => {},
  setParams: () => {},
  fetchTemperatureData: () => {},
});

export const useWeatherContext = ():WeatherResultProps => 
  useContext<WeatherResultProps>(context);

export const WeatherContextProvider = context.Provider;