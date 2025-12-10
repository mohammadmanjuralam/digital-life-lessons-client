import React from "react";

import Swal from "sweetalert2";
import useAxiosHooks from "../../../Controller/useAxiosHooks/useAxiosHooks";
import useAuth from "../../../Controller/useAuth/useAuth";
import { useQuery } from "@tanstack/react-query";

const MyLesson = ({ currentUser }) => {
  const axiosSecure = useAxiosHooks();
  const { user, loading } = useAuth();

  const { data: lessons = [], refetch } = useQuery({
    queryKey: ["myLesson", user?.email],

    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-lessons?email=${user?.email}/role`
      );
      return res.data;
    },
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading your lessons...</p>
      </div>
    );
  }

  if (lessons.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        You haven't created any lessons yet.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My Lessons</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons?.map((lesson) => {
          const isLocked =
            lesson.accessLevel === "Premium" && !currentUser?.isPremium;

          return (
            <div
              key={lesson._id}
              className={`relative bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-shadow ${
                isLocked ? "filter blur-sm" : ""
              }`}
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {lesson.title}
              </h3>
              <p className="text-gray-600 mb-3 line-clamp-3">
                {lesson.description}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                Category: {lesson.category}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                Emotional: {lesson.emotional}
              </p>
              <p className="text-sm text-gray-400">
                Visibility: {lesson.visibility} | Access: {lesson.accessLevel}
              </p>

              {/* Premium Blur */}
              {isLocked && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white rounded-xl">
                  <p className="mb-2 font-bold text-lg">Premium Lesson</p>
                  <button
                    className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300"
                    onClick={() => (window.location.href = "/pricing")}
                  >
                    Upgrade to Premium
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyLesson;
