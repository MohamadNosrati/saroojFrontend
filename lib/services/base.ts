import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const session = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Yjk3OGQ3YjE5YmMyNzZmMzMzMDAwNiIsImlhdCI6MTc1NzUzOTkxNywiZXhwIjoxNzU3NjI2MzE3fQ._Tg8aeGLZDhzaERR5GO1fG1XhiOwGtXUp_35nkcCQFQ";
    if(session){
        config.headers.Authorization = `Bearer ${session}`
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axiosInstance;
