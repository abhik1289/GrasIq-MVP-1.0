// // lib/axios.ts
// import axios from "axios";
// import { useAuthToken } from "@/store/useAuthToken";

// // Axios instance with base config
// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   withCredentials: true, // Important for sending cookies (refresh token)
// });

// // --- Access Token Injection (Request Interceptor) ---
// api.interceptors.request.use((config) => {
//   const token = useAuthToken.getState().accessToken;
//   if (token) {
//     config.headers.Authorization = token;
//   }
//   return config;
// });

// // --- Token Refresh Logic ---
// let isRefreshing = false;
// let subscribers: ((token: string) => void)[] = [];

// // Notify all queued requests with new token
// function onRefreshed(newToken: string) {
//   subscribers.forEach((cb) => cb(newToken));
//   subscribers = [];
// }

// // Add a request to be retried after token is refreshed
// function subscribeTokenRefresh(callback: (token: string) => void) {
//   subscribers.push(callback);
// }

// // --- Handle 401 Errors (Response Interceptor) ---
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // If unauthorized and not already retried
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       // console.log("THIS IS CALLED")
//       // originalRequest._retry = true;

//       // // Wait if refresh is already happening
//       // if (isRefreshing) {
//       //   return new Promise((resolve) => {
//       //     subscribeTokenRefresh((newToken) => {
//       //       originalRequest.headers.Authorization = newToken;
//       //       resolve(api(originalRequest));
//       //     });
//       //   });
//       // }

//       // // Start refresh process
//       // isRefreshing = true;

//       try {
//         const refreshResponse = await axios.post(
//           `${process.env.NEXT_PUBLIC_API_URL}/v1/user/refresh-token`,
//           {},
//           { withCredentials: true }
//         );

//         const newAccessToken = refreshResponse.data.accessToken;
//         useAuthToken.getState().setToken(newAccessToken);

//         onRefreshed(newAccessToken); // Retry all queued requests
//         originalRequest.headers.Authorization = newAccessToken;

//         return api(originalRequest); // Retry original
//       } catch (refreshError) {
//         return Promise.reject(refreshError);
//       } finally {
//         // isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;
