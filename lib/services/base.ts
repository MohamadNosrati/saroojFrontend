// lib/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

// Only import and use cookies on server side
if (typeof window === 'undefined') {
  // Server-side only interceptor
  import('next/headers').then(({ cookies }) => {
    axiosInstance.interceptors.request.use(
      async (config) => {
        const cookieStore = await cookies();
        const token = cookieStore.get(process.env.NEXT_PUBLIC_AUTHTOKEN_KEY || 'auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token.value}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  });
} else {
  // Client-side interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem(process.env.NEXT_PUBLIC_AUTHTOKEN_KEY || 'auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
}

export default axiosInstance;