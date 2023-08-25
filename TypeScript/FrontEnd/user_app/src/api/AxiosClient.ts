import axios from "axios";
import jwtDecode from "jwt-decode";

// Tạo axios
const axiosClient = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axios.defaults.withCredentials = true;
const refreshToken = async () => {
  try {
    const res = await axios.post(
      "http://localhost:8080/api/v1/user/refresh-token",
      {
        withCredentials: true,
      }
    );
    localStorage.setItem("accessToken", res.data);
    // console.log("accessToken", res.data);

    return res.data;
  } catch (error) {
    // console.log(error);
  }
};


axiosClient.interceptors.request.use(
    async (config) => {
        let token;
        try {
            const date = new Date() //Tạo ngày giờ hiện tại kiểm tra
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            token = localStorage.getItem("accessToken") as any;
            
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const decodedToken:any = await jwtDecode(token) //giải mã token
            // console.log(decodedToken)
            if (decodedToken.exp < date.getTime() / 1000) { //Kiểm tra xem giờ hết hạn token vs giờ hiện tại nếu hết thì phải gọi api refresh để nhận token mới
                const data = await refreshToken()
                token = data
            }
        } catch (err) {
            // console.log(err);

        }

        if (token !== null) config.headers.Authorization = `Bearer ${token}`;

        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

// after send request
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// // Thêm một yêu cầu đánh chặn
// axiosClient.interceptors.request.use(
//   function (config) {
//     // Làm điều gì đó trước khi yêu cầu được gửi

//     // gửi access token lên server
//     const accessToken = localStorage.getItem("access_token");
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },

//   function (error) {
//     // Làm điều gì đó với lỗi yêu cầu
//     return Promise.reject(error);
//   }
// );






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
