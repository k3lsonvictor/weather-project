"use client"
import React, { useEffect, useState } from 'react';
import { MapPinIcon, CalendarDaysIcon } from '@heroicons/react/16/solid';
import weatherCode from '../../utils/codesWeather.json';
import { AutoCompleteInputField } from '../Layout/Structure/autoCompleteInput';
import brazilianCities from '@/app/utils/estados-cidades.json';
import useWeatherReducer, { TemperatureData } from '../Layout/Structure/generalReducer';
import { SkeletonLoadingTextBlocks } from '../Layout/Loadings/skeletonLoading';
import SpinnerLoading from '../Layout/Loadings/spinnerLoagind';
import { getLeisureRecommendations } from '@/app/api/callers/weatherAi';

interface LastTemperature {
  temperature: string;
  time: string;
  weatherCode: number | null;
}

export const LastTemperatureCardNew = ({ setLocality, lastTemperature, timezone }: { setLocality: (e: string | null) => void, lastTemperature: TemperatureData, timezone: string | null }) => {
  const { loadingState } = useWeatherReducer();
  const allBrazilianCities = brazilianCities.estados.flatMap((estado) => estado.cidades).sort((a, b) => a.localeCompare(b, "pt-BR"));
  const [selectedCity, setSelectedLocality] = useState<string | null>(null);

  console.log(loadingState);

  const handleCitySelect = (selectedCity: { value: string; label: string }) => {
    setLocality(selectedCity.value);
    setSelectedLocality(selectedCity.value);
  };

  return (
    <div className="
        bg-[#0C101D] rounded rounded-2xl h-auto w-full min-auto font-oswald font-semibold flex flex-col justify-center items-start p-6">
      <div>
        <AutoCompleteInputField
          value={""}
          onSelect={handleCitySelect}
          placeholder="Digite para pesquisar..."
          disabled={false}
          className="text-black bg-white"
          maxLength={undefined}
          options={allBrazilianCities.map((locality) => ({ label: locality, value: locality }))}
          resetButton={() => { }}
          tooltip={false}
          required={false}
          label=""
          icon=""
          modified={false}
        />
      </div>
      <div className="flex justify-between w-full items-center">
        <div className="flex flex-col">
          {loadingState === 1 ? <div className="text-[60px]">{lastTemperature.temperature}ºc</div> : <div className='mt-4'><SpinnerLoading /></div>}
          <div className='text-md'>{weatherCode.weatherCodes.find(code => code.code === lastTemperature.weatherCode)?.summary}</div>
        </div>
        <div className='hidden md:flex'>
          <i className={`wi wi-${weatherCode.weatherCodes.find(code => code.code === lastTemperature.weatherCode)?.icon || "Unknown"} text-[100px]`}></i>
        </div>
      </div>
      <div className="flex flex-col items-start w-full gap-3 mt-6 pt-2 border-t-2 border-white/20">
        <div className='flex gap-2 items-center'>
          <MapPinIcon
            className="h-4 w-4 text-white"
          />
          {loadingState === 1 ? <div className="text-sm">{selectedCity ? selectedCity : timezone}</div> : <div className='mt-4'><SkeletonLoadingTextBlocks height='!h-[12px] !p-0' number={1} /></div>}
        </div>
        <div className='flex gap-2 items-center'>
          <CalendarDaysIcon
            className="h-4 w-4 text-white"
          />
          {loadingState === 1 ? <div className="text-sm">{lastTemperature.time}</div> : <div className='mt-4'><SkeletonLoadingTextBlocks height='!h-[12px] !p-0' number={1} /></div>}
        </div>
      </div>
    </div>
  );
};
