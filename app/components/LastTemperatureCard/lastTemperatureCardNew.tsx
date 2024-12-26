"use client"
import React, { useState } from 'react';
import { MapPinIcon, CalendarDaysIcon } from '@heroicons/react/16/solid';
import weatherCode from '../../utils/codesWeather.json';
import { AutoCompleteInputField } from '../Layout/Structure/autoCompleteInput';
import { useWeatherData } from '@/app/hooks/useWeatherData';

interface LastTemperature {
  temperature: string;
  time: string;
  weatherCode: number | null;
}

export const LastTemperatureCardNew = ({lastTemperature, timezone}:{lastTemperature: LastTemperature, timezone: string | null}) => {

  console.log(timezone)

  const [selectedLocality, setSelectedLocality] = useState<string | null>(null);

  console.log(selectedLocality);

  useWeatherData(0, 0, selectedLocality);

  const localities = [
    "America/Sao_Paulo",
    "America/New_York",
    "America/Chicago",
    "America/Denver",
    "America/Los_Angeles",
    "America/Anchorage",
    "Not set (GMT+0)",
    "GMT+0",
    "Europe/London",
    "Europe/Berlin",
    "Europe/Moscow",
    "Africa/Cairo",
    "Asia/Bangkok",
    "Asia/Singapore",
    "Asia/Tokyo",
    "Australia/Sydney",
    "Pacific/Auckland"
  ];

  return (
    <div className="
        bg-[#0C101D] rounded rounded-2xl h-auto w-full min-auto font-oswald font-semibold flex flex-col justify-center items-start p-6">
      <div>
        <AutoCompleteInputField 
          value={""}
          onSelect={(e) => {
            setSelectedLocality(e.label);
          }}
          placeholder="Digite para pesquisar..."
          disabled={false}
          className=""
          maxLength={undefined}
          options={localities.map((locality) => ({label: locality, value: locality}))}
          resetButton={() => {}}
          tooltip={false}
          required={false}
          label=""
          icon=""
          modified={false}
        />
      </div>
      <div className="flex justify-between w-full items-center">
        <div className="flex flex-col">
          <div className="text-[60px]">{lastTemperature.temperature}ºc</div>
          <div className='text-md'>{weatherCode.weatherCodes.find(code => code.code === lastTemperature.weatherCode)?.summary}</div>
        </div>
        <div className='hidden md:flex'>
          <i className={`wi wi-${weatherCode.weatherCodes.find(code => code.code === lastTemperature.weatherCode)?.icon || "Unknown"} text-[100px]`}></i>
        </div>
      </div>
      <div className="flex flex-col items-start w-full gap-3 mt-6 pt-2 border-t-2 border-white/20">
        <div className='flex gap-2'>
          <MapPinIcon
            className="h-4 w-4 text-white"
          />
          <div className="text-sm">{timezone}</div>
        </div>
        <div className='flex gap-2'>
          <CalendarDaysIcon
            className="h-4 w-4 text-white"
          />
          <div className="text-sm">{lastTemperature.time}</div>
        </div>
      </div>
    </div>
  );
};
