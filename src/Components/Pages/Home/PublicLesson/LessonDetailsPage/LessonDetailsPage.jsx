import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosHooks from "../../../../Controller/useAxiosHooks/useAxiosHooks";
import useAuth from "../../../../Controller/useAuth/useAuth";

const LessonDetailsPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosHooks();
  const { user } = useAuth;
  const [commentText, setCommentText] = useState("");

  // ✅ Fetch lesson details
  const {
    data: lesson,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["lesson-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/public-lessons/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // ✅ Submit new comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    await axiosSecure.post(`/public-lessons/comment/${id}`, {
      user: user?.email || "Anonymous",
      text: commentText,
    });
    setCommentText("");
    refetch(); // refresh lesson data
  };

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500">Error loading lesson</div>;
  if (!lesson)
    return <div className="text-center text-gray-500">Lesson not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-6 flex justify-center items-center">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-2xl p-8">
        {/* Lesson Info */}
        <h1 className="text-3xl font-extrabold text-purple-700 mb-4 text-center">
          {lesson.title}
        </h1>
        <p className="text-gray-700 text-lg mb-6">{lesson.description}</p>

        {/* Comments Section */}
        <div className="bg-gray-50 rounded-lg p-6 shadow">
          <h2 className="text-xl font-bold text-purple-600 mb-4">
            💬 Comments
          </h2>

          {/* Existing comments */}
          {lesson.comments?.length > 0 ? (
            <ul className="space-y-3 mb-6">
              {lesson.comments.map((c, i) => (
                <li key={i} className="bg-white p-3 rounded shadow-sm">
                  <p className="text-sm text-gray-800">
                    <span className="font-semibold text-blue-600">
                      {c.user}:
                    </span>{" "}
                    {c.text}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(c.createdAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mb-6">No comments yet. Be the first!</p>
          )}

          {/* Add new comment */}
          <form onSubmit={handleCommentSubmit} className="flex gap-3">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
            />
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LessonDetailsPage;
