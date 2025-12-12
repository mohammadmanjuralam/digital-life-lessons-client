import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useAxiosHooks from "../../../Controller/useAxiosHooks/useAxiosHooks";
import UseRole from "../../../Controller/useRole/useRole";
import { useNavigate } from "react-router";

const PublicLesson = () => {
  const axiosSecure = useAxiosHooks();
  const { role, roleLoading } = UseRole();
  const [filterlessons, setFilterLessons] = useState();
  const [category, setCategory] = useState();
  const [tone, setTone] = useState();
  const [search, setSearch] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:5000/lessons/public")
      .then((res) => res.json())
      .then((data) => setFilterLessons(data));
  }, []);

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["public-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/public-lessons");
      return res.data;
    },
  });

  if (isLoading || roleLoading)
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );

  return (
    <div>
      <div className="p-10 text-center  text-black space-x-10 flex items-center justify-center ">
        <h1 className="text-white">Category Filter:</h1>
        <select
          className="bg-white p-2"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All</option>
          <option value="Mindset">Mindset</option>
          <option value="Career">Career</option>
          <option value="Personal Growth">Personal Growth</option>
        </select>
        {/* Tone */}
        <h1 className="text-white">Category Filter:</h1>
        <select
          className="bg-white p-2"
          onChange={(e) => setTone(e.target.value)}
        >
          <option value="">All</option>
          <option value="Motivational">Motivational</option>
          <option value="Sad">Sad</option>
          <option value="Realization">Realization</option>
        </select>
        {/* search by keyword */}
        <h1 className="text-white">Category Filter:</h1>
        <input
          className="bg-white rounded-sm p-2"
          type="text"
          placeholder="Search lesson..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 border-2 border-blue-500 justify-center items-center p-4 w-250 mx-auto">
        {lessons.map((lesson) => {
          const isPremiumLocked =
            lesson.accessLevel === "Paid" && role !== "premium";

          const isBlur =
            (lesson.visibility === "Private" ||
              lesson.accessLevel === "Paid") &&
            role !== "premium";

          // ✅ NEW: Public + Premium (only description blur)
          const isPublicPremium =
            lesson.visibility === "Public" &&
            lesson.accessLevel === "Premium" &&
            role !== "premium";

          return (
            <div
              key={lesson._id}
              className="card border-2 border-red-500 rounded-md overflow-hidden shadow-md relative w-[300px] h-[400px]"
            >
              {/* 🔒 Lock icon for Public + Premium */}
              {isPublicPremium && (
                <span className="absolute top-2 left-2 z-30 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                  🔒 Premium
                </span>
              )}

              {/* 🔒 Upgrade badge for Paid lessons */}
              {isPremiumLocked && (
                <span className="absolute top-2 left-2 z-20 bg-yellow-500 text-black text-xs px-2 py-1 rounded">
                  Upgrade to Premium
                </span>
              )}

              {/* ✅ Full blur overlay button for Private/Paid */}
              {isBlur && !isPublicPremium && (
                <button
                  className="absolute inset-0 z-30 flex items-center justify-center"
                  onClick={() => navigate("/pricing-plan")}
                >
                  <span className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded shadow-lg">
                    Upgrade to Premium
                  </span>
                </button>
              )}

              {/* ✅ Card Content */}
              <a
                href="#"
                className={`card1 w-full h-full flex flex-col justify-between p-4 relative ${
                  isBlur && !isPublicPremium
                    ? "blur-sm pointer-events-none"
                    : ""
                }`}
              >
                <div className="flex flex-col justify-start">
                  <h3 className="text-lg font-bold mb-2">{lesson.title}</h3>

                  {/* ✅ Show category & creator always */}
                  <p className="text-sm mb-1">Category: {lesson.category}</p>
                  <p className="text-sm mb-1">Creator: {lesson.creator}</p>

                  {/* ✅ Only description blur for Public + Premium */}
                  <p
                    className={`text-sm mb-2 ${
                      isPublicPremium ? "blur-sm select-none" : ""
                    }`}
                  >
                    {lesson.description}
                  </p>

                  {/* ✅ Show other info normally */}
                  <p className="text-sm mb-1">
                    Visibility: {lesson.visibility}
                  </p>
                  <p className="text-sm mb-1">Access: {lesson.accessLevel}</p>
                </div>

                {/* Private badge (only for Private lessons) */}
                {isBlur &&
                  lesson.visibility === "Private" &&
                  !isPublicPremium &&
                  !isPremiumLocked && (
                    <span className="absolute top-2 right-2 z-10 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      Private
                    </span>
                  )}

                {/* Corner arrow */}
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
    </div>
  );
};

export default PublicLesson;
