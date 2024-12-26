"use client";

import React from 'react';
import Image from "next/image";
import umbrella from "@/public/Images/logoGuardaChuva.png";
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter } from 'next/navigation';

export const SideBar = () => {
  const path = usePathname();
  const router = useRouter();


  console.log(path)
  return (
    <div className="hidden min-[730px]:flex min-[730px]:flex-col items-center w-[150px] h-screen py-8">
      <div className='flex flex-col items-center bg-[#0C101D] h-full px-6 pt-8 pb-6 rounded rounded-2xl ml-4'>
        <div className='flex '>
          <Image
            src={umbrella}
            alt="Umbrella Logo"
            className='w-[50px] h-[50px]'
          />
        </div>

        <div className={`flex flex-col items-center gap-8`}>
          <button
            className={`flex flex-col items-center gap-2 mt-20 ${path === '/weather' ? 'opacity-100' : 'opacity-50'} border-b-2 border-white/30 pb-2`}
            onClick={() => { router.push('/weather') }}
          >
            <i className="wi wi-day-rain text-[20px]"></i>
            <div className='font-semibold text-sm'>Previsão</div>
          </button>

          <button
            className={`flex flex-col items-center gap-2 ${path === '/settings' ? 'opacity-100' : 'opacity-50'} border-b-2 border-white/30 pb-2`}
            onClick={() => { router.push('/settings') }}
          >
            <Cog6ToothIcon className='w-[30px] h-[30px] text-white' />
            <div className='font-semibold text-sm'>Ajustes</div>
          </button>
        </div>
      </div>
    </div>
  )
}