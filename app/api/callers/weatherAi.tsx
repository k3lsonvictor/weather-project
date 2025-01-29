import { request } from "@/app/api/apiRequester";

export const getLeisureRecommendations = async (values: string) => {
  return request(`https://minha-app-node-634861991701.us-central1.run.app/generate`, 'POST', { prompt: values });
};