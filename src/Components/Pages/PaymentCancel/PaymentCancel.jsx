import { useNavigate } from "react-router";

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100">
      <div className="bg-white rounded-xl shadow-lg p-10 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Payment Cancelled ❌
        </h1>
        <p className="text-gray-700 mb-6">
          Your payment was not completed. You can try again or return to the
          Dashboard.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg shadow hover:bg-gray-600 transition"
          >
            Back to Dashboard
          </button>
          <button
            onClick={() => navigate("/pricing-plan")}
            className="bg-red-500 text-white px-6 py-3 rounded-lg shadow hover:bg-red-600 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
