import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosHooks from "../../../Controller/useAxiosHooks/useAxiosHooks";
import UseRole from "../../../Controller/useRole/useRole";

const PublicLesson = () => {
  const axiosSecure = useAxiosHooks();
  const { role, roleLoading } = UseRole();

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["public-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/public-lessons");
      return res.data;
    },
  });

  if (isLoading || roleLoading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 border-2 border-blue-500 justify-center items-center p-4">
      {lessons.map((lesson) => {
        // Determine if lesson is locked for free user
        const isPremiumLocked =
          lesson.accessLevel === "Paid" && role !== "premium";
        const isBlur =
          (lesson.visibility === "Private" || lesson.accessLevel === "Paid") &&
          role !== "premium";

        return (
          <div
            key={lesson._id}
            className="card border-2 border-red-500 rounded-md overflow-hidden shadow-md relative w-[300px] h-[400px]"
          >
            {/* Upgrade badge always on top */}
            {isPremiumLocked && (
              <span className="absolute top-2 left-2 z-20 bg-yellow-500 text-black text-xs px-2 py-1 rounded">
                Upgrade to Premium
              </span>
            )}

            {/* Card content */}
            <a
              href="#"
              className={`card1 w-full h-full flex flex-col justify-between p-4 relative ${
                isBlur ? "blur-sm pointer-events-none" : ""
              }`}
            >
              <div className="flex flex-col justify-start">
                <h3 className="text-lg font-bold mb-2">{lesson.title}</h3>
                <p className="text-sm mb-2">{lesson.description}</p>
                <p className="text-sm mb-1">Emotional: {lesson.emotional}</p>
                <p className="text-sm mb-1">Visibility: {lesson.visibility}</p>
                <p className="text-sm mb-2">Access: {lesson.accessLevel}</p>
              </div>

              {/* Private badge */}
              {isBlur && !isPremiumLocked && (
                <span className="absolute top-2 right-2 z-10 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  Private
                </span>
              )}

              {/* Optional corner arrow */}
              <div className="absolute bottom-2 right-2 z-10">
                <div className="go-corner bg-blue-500 text-white w-6 h-6 flex justify-center items-center rounded-full">
                  <div className="go-arrow text-xs">→</div>
                </div>
              </div>
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default PublicLesson;
