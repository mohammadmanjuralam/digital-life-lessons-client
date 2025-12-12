const LessonCard = ({ lesson, refetch }) => {
  const handleLike = () => {
    fetch(`http://localhost:3000/lessons/like/${lesson._id}`, {
      method: "POST",
    }).then(() => refetch());
  };

  const handleFavorite = () => {
    fetch(`http://localhost:3000/lessons/favorite/${lesson._id}`, {
      method: "POST",
    }).then(() => refetch());
  };

  return (
    <div className="border p-4 rounded">
      <h2 className="text-xl font-bold">{lesson.title}</h2>
      <p>{lesson.description.slice(0, 120)}...</p>

      <div className="flex gap-3 mt-3">
        <button onClick={handleLike}>❤️ {lesson.likes}</button>
        <button onClick={handleFavorite}>🔖 {lesson.favorites}</button>
      </div>

      <Link to={`/lesson/${lesson._id}`} className="text-blue-600 underline">
        See Details
      </Link>
    </div>
  );
};
export default LessonCard;
