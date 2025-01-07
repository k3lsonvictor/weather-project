import { request } from "@/app/api/apiRequester";

export const getLeisureRecommendations = async (values: string) => {
  return request(`http://localhost:3000/generate`, 'POST', { prompt: values });
};