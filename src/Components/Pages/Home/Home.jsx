import React from "react";
import HeroSlide from "./HeroSlide/HeroSlide";
import Footer from "../../Shared/Footer/Footer";
import { useQuery } from "@tanstack/react-query";
import useAxiosHooks from "../../Controller/useAxiosHooks/useAxiosHooks";
import LessonCard from "./LessonCard/LessonCard";

const Home = () => {
  const axiosSecure = useAxiosHooks();

  // ✅ Featured Lessons
  const { data: featuredLessons = [], refetch } = useQuery({
    queryKey: ["featured-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/featured-lessons");
      return res.data;
    },
  });

  // ✅ Top Contributors
  const { data: topContributors = [] } = useQuery({
    queryKey: ["top-contributors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/top-contributors");
      return res.data;
    },
  });

  // ✅ Most Saved Lessons
  const { data: mostSavedLessons = [] } = useQuery({
    queryKey: ["most-saved-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/most-saved-lessons");
      return res.data;
    },
  });
  console.log("Most save from home", mostSavedLessons);

  return (
    <div className="bg-gray-50">
      {/* ✅ Hero Slider */}
      <HeroSlide />

      {/* ✅ Featured Lessons */}
      <section className="p-10">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          🌟 Featured Life Lessons
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredLessons.map((lesson) => (
            <div
              key={lesson._id}
              className="bg-white shadow-md rounded-lg p-5 border"
            >
              <LessonCard key={lesson._id} lesson={lesson} refetch={refetch} />
              <h3 className="text-xl font-semibold text-black">
                {lesson.title}
              </h3>
              <p className="text-sm text-gray-600 text-black">
                Category: {lesson.category}
              </p>
              <p className="text-sm text-gray-600 text-black">
                Creator: {lesson.creator}
              </p>
              <p className="text-sm mt-2 text-black">{lesson.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Why Learning From Life Matters */}
      <section className="bg-white p-10">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          💡 Why Learning From Life Matters
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-gray-100 rounded shadow">
            <h3 className="font-bold">Learn from Real Experiences</h3>
            <p className="text-sm text-gray-600">
              Gain wisdom from authentic life situations.
            </p>
          </div>

          <div className="p-6 bg-gray-100 rounded shadow">
            <h3 className="font-bold">Improve Emotional Intelligence</h3>
            <p className="text-sm text-gray-600">
              Understand emotions and build stronger relationships.
            </p>
          </div>

          <div className="p-6 bg-gray-100 rounded shadow">
            <h3 className="font-bold">Make Better Decisions</h3>
            <p className="text-sm text-gray-600">
              Apply lessons to everyday choices.
            </p>
          </div>

          <div className="p-6 bg-gray-100 rounded shadow">
            <h3 className="font-bold">Grow Personally & Professionally</h3>
            <p className="text-sm text-gray-600">
              Use life lessons to achieve success.
            </p>
          </div>
        </div>
      </section>

      {/* ✅ Top Contributors */}
      <section className="p-10">
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">
          🏆 Top Contributors of the Week
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topContributors.map((user) => (
            <div
              key={user._id}
              className="bg-white shadow-md rounded-lg p-5 border text-center"
            >
              <img
                src={user.avatar || "/default-avatar.png"}
                alt={user.name}
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <h3 className="font-bold  text-black">{user.name}</h3>
              <p className="text-sm text-gray-600  text-black">
                Lessons: {user.lessonCount}
              </p>
              <p className="text-sm text-gray-600  text-black">
                Engagement Score: {user.score}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Most Saved Lessons */}
      <section className="bg-white p-10">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
          🔥 Most Saved Lessons
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mostSavedLessons.map((lesson) => (
            <div
              key={lesson._id}
              className="bg-white shadow-md rounded-lg p-5 border"
            >
              <LessonCard key={lesson._id} lesson={lesson} refetch={refetch} />
              <h3 className="text-xl font-semibold  text-black">
                {lesson.title}
              </h3>
              <p className="text-sm text-gray-600  text-black">
                Category: {lesson.category}
              </p>
              <p className="text-sm text-gray-600  text-black">
                Saves: {lesson.favorites?.length || 0}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
