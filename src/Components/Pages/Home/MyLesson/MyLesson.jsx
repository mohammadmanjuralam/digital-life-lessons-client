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
    <div className="p-4 text-black flex justify-center items-center border-2 border-red-500">
      {lessons.length === 0 ? (
        <p>No lessons found.</p>
      ) : (
        <div className="flex flex-col sm:flex-cols-2 lg:flex-cols-3 gap-4  border-2 border-blue-500 justify-center items-center">
          {lessons.map((lesson) => (
            <div className="card border-2 border-red-500  ">
              <a className="card1 w-[300px] h-[400px]" href="#">
                <p>{lesson.title}</p>
                <p className="small">{lesson.description}</p>
                <p>{lesson.emotional}</p>
                <p>{lesson.visibility}</p>
                <p>{lesson.accessLevel}</p>
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
