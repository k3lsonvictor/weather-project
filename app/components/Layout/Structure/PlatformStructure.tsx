"use client";
import React from 'react';
import { QueryClient, QueryClientProvider, QueryCache } from 'react-query';
import { persistQueryClient } from 'react-query/persistQueryClient-experimental';
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental';

export const PlatformStructure = ({ children }: { children: any }) => {
  const queryClient = new QueryClient();
  const localStoragePersistor = createWebStoragePersistor({ storage: window.localStorage });

  persistQueryClient({
    queryClient,
    persistor: localStoragePersistor,
  });
  
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex bg-bren-blue-100 min-h-screen w-full bg-gradient-to-r from-[#1C2637] to-[#101526]">
        {children}
      </div>
    </QueryClientProvider>
  );
};