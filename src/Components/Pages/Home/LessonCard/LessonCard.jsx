import { Link, useNavigate } from "react-router";

import "../LessonCard/LessonCard.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../CheckoutForm/CheckoutForm"; // we'll build this next
import { useState } from "react";
import useAuth from "../../../Controller/useAuth/useAuth";
import { FaLock } from "react-icons/fa";

const stripePromise = loadStripe("your-publishable-key"); // from Stripe dashboard

const LessonCard = ({ lesson }) => {
  const [showPayment, setShowPayment] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const handleUpgrade = async () => {
    navigate("/pricing-plan");
  };

  if (!lesson) return null;

  const isPremium = lesson.accessLevel === "Premium";
  const isCreator = user?.email === lesson.creatorEmail;
  const canView = !isPremium || isCreator || user?.role === "premium";

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Card content */}
      <div
        className={`card bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform 
        ${!canView ? "blur-sm select-none pointer-events-none" : ""}`}
      >
        <div className="card_title__container p-6">
          <span className="card_title text-2xl font-bold text-purple-700 block mb-2">
            {lesson.title}
          </span>
          <p className="card_paragraph text-gray-600 text-sm">
            {lesson.description?.slice(0, 100)}...
          </p>
        </div>

        <hr className="line border-t border-gray-200 mx-6" />

        <ul className="card__list p-6 space-y-2 text-sm text-gray-700">
          <li>📂 Category: {lesson.category}</li>
          <li>👤 Creator: {lesson.creator}</li>
          <li>🌍 Visibility: {lesson.visibility}</li>
          <li>🔑 Access: {lesson.accessLevel}</li>
        </ul>

        <div className="p-4 text-center">
          <Link
            to={`/lesson-details/${lesson._id}`}
            className="button bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
          >
            See Details →
          </Link>
        </div>
      </div>

      {/* Overlay for locked Premium lessons */}
      {!canView && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          {!showPayment ? (
            <button
              onClick={() => setShowPayment(handleUpgrade)}
              className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded shadow-lg hover:bg-yellow-600 transition flex"
            >
              <span className="mt-1 mr-2">
                {" "}
                <FaLock />
              </span>
              Upgrade to Premium
            </button>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
              <Elements stripe={stripePromise}>
                <CheckoutForm userEmail={user?.email} />
              </Elements>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LessonCard;
