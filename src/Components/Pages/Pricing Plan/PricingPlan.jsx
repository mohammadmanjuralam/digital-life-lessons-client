import { useEffect, useState } from "react";

import { useNavigate } from "react-router";
import useAuth from "../../Controller/useAuth/useAuth";
import useAxios from "../../Controller/useAxiosHooks/useAxios";

const PricingPlan = () => {
  const axiosSecure = useAxios();
  const { user, premiumStatus } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // If user already premium → redirect or show badge
  useEffect(() => {
    if (premiumStatus === true) {
      navigate("/dashboard");
    }
  }, [premiumStatus, navigate]);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const { data } = await axiosSecure.post("/create-checkout-session", {
        email: user?.email,
      });
      window.location.replace(data.url);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}{" "}
      <div className="text-center mb-10">
        {" "}
        <h1 className="text-4xl font-bold text-indigo-600">
          Upgrade to Premium ⭐
        </h1>{" "}
        <p className="text-gray-600 mt-2">
          Unlock full access to Premium lessons & exclusive features.{" "}
        </p>{" "}
      </div>
      {/* Comparison Table */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Free Plan */}
        <div className="border p-6 rounded-xl shadow-sm bg-white">
          <h2 className="text-2xl font-bold mb-4 text-indigo-600">Free Plan</h2>
          <ul className="space-y-3 text-gray-700">
            <li>✔ View all Public Free Lessons</li>
            <li>✔ Like, Comment & Favorite</li>
            <li>✔ Create Free Lessons</li>
            <li>❌ Access Premium Lessons</li>
            <li>❌ Create Premium Lessons</li>
            <li>❌ Ad-Free Experience</li>
            <li>❌ Priority Listing</li>
          </ul>
        </div>

        {/* Premium Plan */}
        <div className="border p-6 rounded-xl shadow-lg bg-indigo-50">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">
            Premium Plan ⭐
          </h2>

          <ul className="space-y-3 text-gray-800">
            <li>✔ Access ALL Premium Lessons</li>
            <li>✔ Create Unlimited Premium Lessons</li>
            <li>✔ No Ads — Clean Experience</li>
            <li>✔ Priority Listing in Contributors</li>
            <li>✔ Lifetime Access</li>
            <li>✔ Support the platform</li>
          </ul>

          {/* Price */}
          <div className="mt-6">
            <p className="text-3xl font-bold text-indigo-700">৳1500</p>
            <p className="text-gray-600">One-time Payment • Lifetime Access</p>
          </div>

          {/* Upgrade Button */}
          <button
            onClick={handleUpgrade}
            disabled={loading}
            className="mt-6 w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-lg font-semibold"
          >
            {loading ? "Processing..." : "Upgrade to Premium"}
          </button>
        </div>
      </div>
      {/* Why Premium Section */}
      <div className="mt-14 text-center">
        <h3 className="text-2xl font-bold text-white">Why Choose Premium?</h3>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="p-6 bg-white shadow rounded-xl">
            <h4 className="font-semibold text-lg text-indigo-600">
              Full Access
            </h4>
            <p className="text-gray-600 mt-2">
              Unlock every premium life lesson shared by top contributors.
            </p>
          </div>

          <div className="p-6 bg-white shadow rounded-xl">
            <h4 className="font-semibold text-lg text-indigo-600">No Ads</h4>
            <p className="text-gray-600 mt-2">
              Smooth and distraction-free learning experience.
            </p>
          </div>

          <div className="p-6 bg-white shadow rounded-xl">
            <h4 className="font-semibold text-lg text-indigo-600">
              Lifetime Deal
            </h4>
            <p className="text-gray-600 mt-2">
              Pay once — enjoy premium access forever.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlan;
