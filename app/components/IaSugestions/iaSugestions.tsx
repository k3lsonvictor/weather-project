"use client"
import React, { useEffect, useState } from 'react';
import useWeatherReducer from '../Layout/Structure/generalReducer';
import { SkeletonLoadingTextBlocks } from '../Layout/Loadings/skeletonLoading';
import SpinnerLoading from '../Layout/Loadings/spinnerLoagind';
import { getLeisureRecommendations } from '@/app/api/callers/weatherAi';

interface TemperatureData {
  temperatureAlongDay: { value: { temperature: number, weatherCode: number | null }, label: string }[];
  weatherInfoDay: { windSpeed: number, windDirection: number, uvIndex: number, maxTemperature: number };
}

export const AiSugestions = ({ temperatureAlongDay, weatherInfoDay }: TemperatureData) => {
  const { loadingState } = useWeatherReducer();
  const [resumeWeather, setResumeWeather] = useState<string>("")
  const [sugestions, setSugestions] = useState<string[] | string>("")
  const [question, setQuestion] = useState<string>("")
  const [submittedQuestion, setSubmittedQuestion] = useState<string>("");

  console.log(loadingState);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && question.trim() !== "") {
      setSubmittedQuestion(question); // Atualiza o estado de question enviado
      setQuestion(""); // Limpa o campo de input
      setSugestions("");
    }
  };

  useEffect(() => {
    if (temperatureAlongDay && weatherInfoDay && temperatureAlongDay.length > 0 && Object.keys(weatherInfoDay).length > 0) {
      const fetchSuggestions = async () => {
      const res = await getLeisureRecommendations(`Responder sempre apenas sobre o clima e os dados aprensentados! ${submittedQuestion?`${submittedQuestion} Dados: ${JSON.stringify({ temperatureAlongDay, weatherInfoDay })}. Não cite weatherCode`  : `A partir dos dados a seguir, resuma de forma rápida sobre o clima do dia e indique 3 atividades para se fazer. Não cite weatherCode. Me retorne como um json com chave relacionada ao resumo e as outras chaves relacionadas as sugestões. Sem o nome json, apenas como objeto. Dados: ${JSON.stringify({ temperatureAlongDay, weatherInfoDay })}`}`);
        console.log(res);
        if(res?.data.resumo && res?.data.sugestoes){
          setResumeWeather(`${res?.data.resumo}`)
          setSugestions(res.data.sugestoes)
        } else {
          setResumeWeather(res.data)
        }
        console.log()
      };
      fetchSuggestions();
    }
  }, [temperatureAlongDay, weatherInfoDay, submittedQuestion]);

  return (
    <div className="bg-white rounded rounded-2xl h-auto w-full min-auto font-oswald font-semibold flex flex-col items-start justify-start p-6 gap-4">
      <div className='text-black'>Resumo Diário</div>
      <div className='flex flex-col max-h-[180px] overflow-y-scroll text-black gap-2'>
        {resumeWeather}
        <div className='flex flex-col'>
          {sugestions !== "" && <div>Sugestões:</div>}
          {Array.isArray(sugestions) && sugestions.length > 0 && sugestions.map((sugestion, i) => {
            return <div key={i}>{`-`}{sugestion}</div>
          })}
        </div>
      </div>
      <input
        id="exampleInput"
        type="text"
        value={question}
        onChange={(e) => {setQuestion(e.target.value) }}
        onKeyDown={handleKeyPress}
        className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-md text-black"
        placeholder="Pergunte sobre o clima..."
      />
    </div>
  );
};
