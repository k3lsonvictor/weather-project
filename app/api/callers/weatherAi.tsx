import { request } from "@/app/api/apiRequester";

export const getLeisureRecommendations = async (values: string) => {
  return request(`https://minha-app-node-ehws3samja-uc.a.run.app/generate`, 'POST', { prompt: values });
};