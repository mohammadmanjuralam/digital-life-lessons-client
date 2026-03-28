import React from "react";
import useAxiosHooks from "../../../Controller/useAxiosHooks/useAxiosHooks";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Controller/useAuth/useAuth";
import "./MyLesson.css";

const MyLesson = () => {
  const axiosSecure = useAxiosHooks();
  const { user } = useAuth();

  const { data: lessons = [] } = useQuery({
    queryKey: ["myLessons", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-lessons/${user?.email}`); // ✅ await
      return res.data;
    },
  });

  return (
    <div className="p-4 text-black flex justify-center items-center  ">
      {lessons.length === 0 ? (
        <p>No lessons found.</p>
      ) : (
        <div className="grid-col sm:grid -cols-2 lg:grid-cols-3 gap-4    justify-center items-center">
          {lessons.map((lesson) => (
            <div className="card ">
              <a className="card1 w-[300px] h-[400px]" href="#">
                <p><span className="font-bold text-black">Title:</span> {lesson.title}</p>
                <p className="small">{lesson.description}</p>
                <p><span className="font-bold text-black">Emotional:</span> {lesson.emotional}</p>
                <p><span className="font-bold text-black">Visibility:</span> {lesson.visibility}</p>
                <p><span className="font-bold text-black">Access Level:</span> {lesson.accessLevel}</p>
                <div className="go-corner" href="#">
                  <div className="go-arrow">→</div>
                </div>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLesson;
