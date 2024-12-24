import { useState } from "react";
import VerticalLineChart from "../Layout/Charts/VerticalChart"
import { ToggleSwitch } from "../Layout/toggleSwitch"
import weatherCodes from "../../utils/codesWeather.json"
import { SimpleCard } from '../SimpleCard/simplesCard';

interface TemperatureData {
  temperatureAlongDay: { value: { temperature: number, weatherCode: number | null }, label: string }[];
  weatherInfoDay: { windSpeed: number, windDirection: number, uvIndex: number, maxTemperature: number };
}

export const TodayWeather = ({ temperatureAlongDay, weatherInfoDay }: TemperatureData) => {
  const filterTemperatureData = (data: { value: { temperature: number, weatherCode: number | null }, label: string }[]) => {
    const filteredData = [];
    const interval = Math.floor(data.length / 6);
    for (let i = 0; i < data.length; i += interval) {
      filteredData.push(data[i]);
    }
    return filteredData;
  };

  console.log(weatherInfoDay)

  const filteredTemperatureAlongDay = filterTemperatureData(temperatureAlongDay);

  console.log(filteredTemperatureAlongDay);
  const [isSimplified, setIsSimplified] = useState(false);
  return (
    <div className="hidden relative lg:flex flex-1 flex-col items-center w-full h-full gap-2 p-8 bg-[#0C101D] rounded rounded-2xl overflow-hidden font-oswald font-semibold">
      <div className="flex mb-8">Previsão para hoje</div>
      {isSimplified === false && <div className="flex w-full h-full overflow-hidden gap-4">
        <div className="flex-grow w-[70%] max-w-[80%] h-[90%] pr-4">
          <div className="flex w-full h-full">
            <VerticalLineChart
              data={[
                { data: temperatureAlongDay.map(item => ({ label: item.label, value: item.value.temperature })) },
              ]}
            />
          </div>
        </div>
        <div className="flex-shrink-0 flex flex-col justify-start w-auto items-start gap-4">
          <SimpleCard
            icon="thermometer"
            description="Temperatura máxima"
            value={`${weatherInfoDay?.maxTemperature?.toFixed(0)} ºC`}
          />
          <SimpleCard
            icon="day-sunny"
            description="TIncidência UV"
            value={`${weatherInfoDay?.uvIndex?.toFixed(2)}`}
          />
          <SimpleCard
            icon="windy"
            description="Velocidade do vento"
            value={`${weatherInfoDay?.windSpeed?.toFixed(0)} km/h`}
          />
          <SimpleCard
            icon="wind"
            description="Direção do vento"
            value={`${weatherInfoDay?.windDirection?.toFixed(1)} º`}
          />
        </div>
      </div>}
      {isSimplified === true && <div className="flex flex-col justify-center gap-4 w-full h-full">
        <div className="grid grid-cols-6">
          {filteredTemperatureAlongDay.map((data, index) => (
            <div key={index} className="flex flex-col items-center border-r border-white/30 last:border-r-0 gap-4">
              <div>{data.label}</div>
              <div>
                <i className={`wi wi-${weatherCodes.weatherCodes.find(code => code.code === data.value.weatherCode)?.icon || "Unknown"} text-[30px]`}></i>
              </div>
              <div>{data.value.temperature.toFixed(0)}ºc</div>
            </div>
          ))}

        </div>
      </div>}
      <div className="flex absolute top-6 right-[12px] gap-4">
        <div className="font-light">Resumo</div>
        <ToggleSwitch
          onClick={() => setIsSimplified(!isSimplified)}
          checked={isSimplified}
        />
      </div>
    </div>
  )
}