"use client"

import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const resultado: { x: string; y: number }[] = [
  { x: '00:00', y: 47.7 },
  { x: '01:00', y: 32.9 },
  { x: '02:00', y: 34.7 },
  { x: '03:00', y: 28.1 },
  { x: '04:00', y: 25.4 },
  { x: '05:00', y: 23.8 },
  { x: '06:00', y: 20.7 },
  { x: '07:00', y: 50.0 },
  { x: '08:00', y: 20.1 },
  { x: '09:00', y: 39.0 },
  { x: '10:00', y: 31.2 },
  { x: '11:00', y: 44.4 },
  { x: '12:00', y: 40.4 },
  { x: '13:00', y: 36.3 },
  { x: '14:00', y: 21.2 },
  { x: '15:00', y: 33.4 },
  { x: '16:00', y: 23.8 },
  { x: '17:00', y: 47.6 },
  { x: '18:00', y: 33.9 },
  { x: '19:00', y: 27.6 },
  { x: '20:00', y: 29.2 },
  { x: '21:00', y: 39.3 },
  { x: '22:00', y: 46.8 },
  { x: '23:00', y: 28.8 },
];

export default function Charts() {

  const options: ApexOptions = {
    chart: {
      fontFamily: 'Inter',
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight',
    },
    title: {
      text: 'Registro diário de Temperatura',
      align: 'center',
      style: {
        fontSize: "25px",
        color: 'black'
      }
    },
    grid: {
      row: {
        colors: ['transparent', 'transparent'],
        opacity: 0.5
      },
    },

    xaxis: {
      labels: {
        datetimeFormatter: {
          hour: 'HH:mm'
        }
      }
    },
    yaxis: {
      decimalsInFloat: 1,
      tooltip: {
        enabled: true,
      }


    }
  };

  const series = [{
    data: resultado
  }]

  return (
    <ReactApexChart options={options} series={series} type="line" height={500} width={800} />
  )
}