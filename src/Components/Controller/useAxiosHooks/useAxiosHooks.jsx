import axios from "axios";
import React, { useEffect } from "react";

import { useNavigate } from "react-router";
import useAuth from "../useAuth/useAuth";
const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});
const useAxiosHooks = () => {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();
  useEffect(() => {
    // inceptors Request
    const reqInterceptors = axiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      return config;
    });
    const resInterceptors = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
        const status = error.status;
        if (status === 401 || status === 403) {
          logOut().then(() => {
            navigate("/auth/login");
          });
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptors);
      axiosSecure.interceptors.response.eject(resInterceptors);
    };
  }, [user, logOut, navigate]);
  return axiosSecure;
};

export default useAxiosHooks;
