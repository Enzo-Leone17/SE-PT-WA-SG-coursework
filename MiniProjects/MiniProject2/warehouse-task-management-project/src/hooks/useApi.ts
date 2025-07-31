import axios, {
  type InternalAxiosRequestConfig,
  type AxiosRequestConfig,
  AxiosError,
  type AxiosInstance,
} from "axios";
import { useAuth } from "./useAuth";
import { useMemo } from "react";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

export const useApi = (): AxiosInstance => {
  const authContext = useAuth();
  const token = authContext?.user?.accessToken;

  const api = useMemo(() => {
    const instance = axios.create();

    // Attach token to each request
    instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    // Handle token expiration (403 error) in response
    instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;

        if (error.response?.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = authContext?.user?.refreshToken;

            if (!refreshToken) {
              throw new Error("No refresh token available");
            }

            // Attempt to refresh the token
            const response = await axios.post(
              "http://localhost:8000/api/warehouse/auth/refresh",
              { refreshToken }
            );

            const { accessToken: newToken } = response.data;

            // Store and apply new token
            authContext?.setUser({
              ...authContext?.user,
              accessToken: newToken,
            });

            originalRequest.headers = {
              ...originalRequest.headers,
              Authorization: `Bearer ${newToken}`,
            };

            // Retry the original request
            return axios(originalRequest);
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            // Optionally: logout or redirect to login
          }
        }

        console.log("api error", error)
        return Promise.reject(error);
      }
    );

    return instance;
  }, [authContext, token]);
  
  return api;
};
