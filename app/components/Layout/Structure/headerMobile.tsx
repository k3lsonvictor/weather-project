"use client";

import Image from "next/image";
import React from "react";
import umbrella from '@/public/Images/logoGuardaChuva.png';
import { usePathname, useRouter } from "next/navigation";
import { Cog6ToothIcon } from "@heroicons/react/16/solid";

export const HeaderMobile = () => {
  const path = usePathname();
  const router = useRouter();

  return (
    <div className="hidden max-[730px]:flex flex-row justify-between items-center px-4 pt-4 bg-bren-blue-100 w-full">
      <div className="flex flex-row items-center justify-between w-full bg-[#0C101D] h-full px-12 pt-8 pb-6 rounded rounded-2xl mx-4">
        <div className='flex'>
          <Image
            src={umbrella}
            alt="Umbrella Logo"
            className='w-[50px] h-[50px]'
          />
        </div>

        <div className={`flex flex-row items-betwwen gap-12`}>
          <button
            className={`flex flex-col items-center justify-between gap-2 ${path === '/weather' ? 'opacity-100' : 'opacity-50'}  pb-2`}
            onClick={() => { router.push('/weather') }}
          >
            <i className="wi wi-day-rain text-[20px]"></i>
            <div className='font-semibold text-sm'>Previsão</div>
          </button>

          <button
            className={`flex flex-col items-center justify-between gap-2 ${path === '/settings' ? 'opacity-100' : 'opacity-50'}  pb-2`}
            onClick={() => { router.push('/settings') }}
          >
            <Cog6ToothIcon className='w-[25px] h-[25px] text-white' />
            <div className='font-semibold text-sm'>Ajustes</div>
          </button>
        </div>
      </div>
    </div>
  )
}