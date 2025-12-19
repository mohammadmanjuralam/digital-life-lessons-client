import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import useAxiosHooks from "../../Controller/useAxiosHooks/useAxiosHooks";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosHooks();
  const navigate = useNavigate();
  console.log("PaymentSuccess mounted");
  console.log("Session ID:", sessionId);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch("/payment-success", { session_id: sessionId })
        .then(() => {
          queryClient.invalidateQueries(["user-role"]);
          navigate("/dashboard"); // 👈 VERY IMPORTANT
        });
    }
  }, [sessionId, axiosSecure, queryClient, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold text-green-600">
        Payment Successful 🎉
      </h2>
      <p className="mt-2">Upgrading your account to Premium...</p>
    </div>
  );
};

export default PaymentSuccess;
