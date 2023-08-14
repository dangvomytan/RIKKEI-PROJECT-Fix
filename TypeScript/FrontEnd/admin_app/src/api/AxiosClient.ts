import axios from "axios";

// Tạo axios
const axiosClient = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Thêm một yêu cầu đánh chặn
axiosClient.interceptors.request.use(
  function (config) {
    // Làm điều gì đó trước khi yêu cầu được gửi

    // gửi access token lên server
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },

  function (error) {
    // Làm điều gì đó với lỗi yêu cầu
    return Promise.reject(error);
  }
);

// Thêm một bộ đánh chặn phản hồi
// axiosClient.interceptors.response.use(
//   function (response) {
//     return response.data;
//   },
//   function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // console.log("axiosClient - response error", error.response);
//     const { config, status, data } = error.response;
//     error.message = data;
//     if (config.url === "/register" && status === 400) {
//       throw new Error(data);
//     }
//     if (config.url === "/login" && status === 401) {
//       error.message = data;
//       throw new Error(data);
//     }
//     if (config.url === "/addCartItem" && status === 401) {
//       error.message = data;
//       throw new Error(data);
//     }

//     return Promise.reject(error);
//   }
// );
  
export default axiosClient;
