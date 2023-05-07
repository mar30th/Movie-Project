import axios from "axios";
import { toast } from "react-toastify";

const http = axios.create();
const localStorage: Storage = window.localStorage;

let token: string = "";
export const checkToken = (): void => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (user === null) {
    token = "";
  } else {
    token = `Bearer ${user.accessToken}`;
  }
};
  
const baseURL = "https://movienew.cybersoft.edu.vn/api/";

const TokenCyberSoft = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udGVuZCA3NCIsIkhldEhhblN0cmluZyI6IjE2LzA5LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5NDgyMjQwMDAwMCIsIm5iZiI6MTY2ODI3MjQwMCwiZXhwIjoxNjk0OTcwMDAwfQ.3TXoqM7cOKUQgRGc0plbpUsV406snlZBBeHlA7RxJYk'

http.interceptors.request.use((config: any) => {
    return {
        ...config,
        headers: {
            TokenCyberSoft,
            Authorization: token,
        },
        baseURL,
    };
});

http.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log(error);
        if(error?.response?.status === 403) {
            toast.error("Khong co quyen truy cap");
        }else if (error?.response?.status === 400) {
            toast.error(error.response?.data.content);
        }else if (error?.response?.status === 404) {
            toast.error(error.response?.data.content);
        }else if (error?.response?.status === 500) {
            toast.error(error.response?.data?.content);
        }else if (error?.response?.status === 401) {
            toast.error(error.response?.data?.content);
         }
    }
)

export default http

export const httErrorCode = {
    403: "",
};
export const messError = {
    403: "Khong co quyen truy cap"
}