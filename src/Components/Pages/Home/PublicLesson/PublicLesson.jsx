import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import LessonCard from "../LessonCard/LessonCard";
import useAxiosHooks from "../../../Controller/useAxiosHooks/useAxiosHooks";

const PublicLesson = () => {
  const axiosSecure = useAxiosHooks();

  const [category, setCategory] = useState("");
  const [tone, setTone] = useState("");
  const [search, setSearch] = useState("");

  const {
    data: lessons = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["public-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/public-lessons");
      return res.data;
    },
  });

  // ✅ Filtered lessons (derived state)
  const filteredLessons = useMemo(() => {
    let finalData = [...lessons];

    if (category) {
      finalData = finalData.filter((item) => item.category === category);
    }

    if (tone) {
      finalData = finalData.filter((item) => item.tone === tone);
    }

    if (search) {
      finalData = finalData.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    return finalData;
  }, [lessons, category, tone, search]);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }
  console.log(lessons);

  return (
    <div>
      {/* 🔹 Filters */}
      <div className="p-10 text-center text-black space-x-10 flex flex-wrap items-center justify-center">
        <h1 className="text-white">Category:</h1>
        <select
          className="bg-white p-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Mindset">Mindset</option>
          <option value="Career">Career</option>
          <option value="Personal Growth">Personal Growth</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
        </select>

        <h1 className="text-white">Tone:</h1>
        <select
          className="bg-white p-2"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        >
          <option value="">All Emotional Tones</option>
          <option value="Motivational">Motivational</option>
          <option value="Sad">Sad</option>
          <option value="Realization">Realization</option>
          <option value="Happy">Happy</option>
          <option value="Inspiring">Inspiring</option>
        </select>

        <h1 className="text-white">Search:</h1>
        <input
          className="bg-white rounded-sm p-2"
          type="text"
          placeholder="Search lesson..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 🔹 Lessons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 border-2 border-blue-500 justify-center items-center p-4 max-w-7xl mx-auto">
        {filteredLessons.length === 0 ? (
          <p className="text-white text-center col-span-full">
            No lessons found
          </p>
        ) : (
          filteredLessons.map((lesson) => (
            <LessonCard key={lesson._id} lesson={lesson} refetch={refetch} />
          ))
        )}
      </div>
    </div>
  );
};

export default PublicLesson;
