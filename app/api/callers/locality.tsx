import { request } from "../apiRequester";

export interface LocalityRequest {
  q: string;
  format: string;
  limit: number;
}

export interface LocalityResponse {
  lat: string;
  lon: string;
}

export const getLocality = async (params: LocalityRequest) => {
  return request<LocalityResponse>(`https://nominatim.openstreetmap.org/search?q=${params.q}&format=${params.format}&limit=${params.limit}`, "GET");
}