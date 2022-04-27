import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Config } from "./config";

const baseUrl = Config.baseUrl || "http://localhost:3001";

/**
 * Provides a GET request to the api.
 *
 * @param route The route to access.
 * @param auth Whether the authentication token should be included in the request or not.
 * @returns A promise of the response of the request.
 */
export function get(
  route: string,
  auth?: boolean
): Promise<AxiosResponse<any, any>> {
  const config: AxiosRequestConfig = {};
  if (auth && localStorage.getItem("token")) {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
  }

  return axios.get(`${baseUrl}${route}`, config);
}

/**
 * Provides a POST request to the api.
 *
 * @param route The route to access.
 * @param body The body of the request.
 * @param auth Whether the authentication token should be included in the request or not.
 * @returns A promise of the response of the request.
 */
export function post(
  route: string,
  body: Record<string, unknown>,
  auth?: boolean
): Promise<AxiosResponse<any, any>> {
  const config: AxiosRequestConfig = {};
  if (auth && localStorage.getItem("token")) {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
  }

  return axios.post(`${baseUrl}${route}`, body, config);
}
