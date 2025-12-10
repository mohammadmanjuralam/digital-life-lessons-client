import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../useAuth";
import useAxiosHooks from "../useAxiosHooks";

const UseRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosHooks();
  const { data: role = "user", isLoading: roleLoading } = useQuery({
    queryKey: ["user-role", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data?.role || "user";
    },
  });
  return { role, roleLoading };
};

export default UseRole;
