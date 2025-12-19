import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useRole = (email) => {
  const {
    data: role,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user-role", email],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/users/${email}/role`);
      return res.data.role;
    },
    enabled: !!email, // only fetch if email exists
  });

  return { role, isLoading, error };
};

export default useRole;
