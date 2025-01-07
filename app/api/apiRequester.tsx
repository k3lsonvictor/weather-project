import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { GetEnvValue } from "./env";

export interface ApiResponse<T> {
  data: T;
  status: number;
}

export async function request<T>(
  url: string,
  method: AxiosRequestConfig["method"],
  data?: unknown,
  params?: unknown,
  contentType?: string,
  showRawError?: boolean
): Promise<ApiResponse<T> | undefined | any> {

  const BASE_URL = await GetEnvValue("NEXT_PUBLIC_API_URL");

  try {
    const config: AxiosRequestConfig = {
      url: url,
      method,
      data,
      params,
      headers: {
        "Content-Type": contentType || "application/json",
      }
    };
    const response: AxiosResponse<T> = await axios(config);
    return { data: response.data, status: response.status };
  } catch (error: unknown) {
    if (showRawError) {
      return error;
    }
  }
}