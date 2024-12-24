"use client"
import React from 'react';
import { MapPinIcon, CalendarDaysIcon } from '@heroicons/react/16/solid';
import weatherCode from '../../utils/codesWeather.json';

interface LastTemperature {
  temperature: string;
  time: string;
  weatherCode: number | null;
}

export const LastTemperatureCardNew = ({lastTemperature, timezone}:{lastTemperature: LastTemperature, timezone: string | null}) => {
  console.log(lastTemperature)

  return (
    <div className="
        bg-[#0C101D] rounded rounded-2xl h-auto w-full min-auto font-oswald font-semibold flex flex-col justify-center items-start p-6">
      <div>
        <input className='rounded rounded-lg border-2 border-white/30 bg-[#0C101D] placeholder:text-sm placeholder:opacity-30 py-1 pl-4 text-sm' type="text" placeholder='Pesquisar local...'/>
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
