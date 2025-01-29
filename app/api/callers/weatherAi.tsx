import { request } from "@/app/api/apiRequester";

export const getLeisureRecommendations = async (values: string) => {
  return request(`https://api-studies-1049486429780.us-central1.run.app/generate`, 'POST', { prompt: values });
};