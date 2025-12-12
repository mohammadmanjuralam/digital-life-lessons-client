import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const LessonDetailsPage = () => {
  const { id } = useParams(); // lesson id
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");

  // Load lesson data
  useEffect(() => {
    fetch(`http://localhost:5000/lessons/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setLesson(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;

  const handleComment = () => {
    fetch(`http://localhost:5000/lessons/comment/${id}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text: comment, user: "Test user" }),
    })
      .then((res) => res.json())
      .then(() => {
        setComment("");
        // reload lesson to show new comment
        fetch(`http://localhost:5000/lessons/${id}`)
          .then((res) => res.json())
          .then((data) => setLesson(data));
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h1 className="text-3xl font-bold">{lesson.title}</h1>
      <p className="mt-3">{lesson.description}</p>

      <h2 className="text-xl font-semibold mt-6">Comments:</h2>
      <div className="mt-3 space-y-2">
        {lesson.comments?.map((c, i) => (
          <div key={i} className="p-3 border rounded bg-gray-50">
            {c.text}
          </div>
        ))}
      </div>

      <div className="mt-5">
        <input
          className="border p-2 w-full rounded"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          onClick={handleComment}
          className="px-4 py-2 bg-blue-600 text-white rounded mt-2"
        >
          Post Comment
        </button>
      </div>
    </div>
  );
};

export default LessonDetailsPage;
