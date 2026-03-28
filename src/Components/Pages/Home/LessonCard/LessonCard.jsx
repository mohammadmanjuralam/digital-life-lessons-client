import { Link, useNavigate } from "react-router";
import "../LessonCard/LessonCard.css";
import { FaLock } from "react-icons/fa";
import useRole from "../../../Controller/useRole/useRole";
import useAuth from "../../../Controller/useAuth/useAuth";

const LessonCard = ({ lesson }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log(user);

  const { role, isLoading } = useRole(user?.email);
  console.log(role);
  // const { data: users = [] } = useQuery({
  //   queryKey: ["user", user?.email],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get(`/user?email=${user?.email}/role`);
  //     return res.data;
  //   },
  // });
  // console.log(users);

  if (isLoading) {
    return <span>Loading user role...</span>;
  }
  if (!lesson) return null;
  console.log(lesson.accessLevel);
  const premiumUser = role === "premium";
  const nonUser = user === null;
  const freeLesson = lesson?.accessLevel === "Free";
  const premiumLesson = lesson?.accessLevel === "Premium";
  // const notUser = user === null;
  console.log(freeLesson);
  const canView = premiumUser || user;

  return (
    <div className="relative w-full max-w-sm mx-auto my-4">
      {/* Card */}
      <div
        className={`card bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform 
        ${!canView ? "blur-sm select-none pointer-events-none" : ""}`}
      >
        <di
        
        v className="card_title__container p-6">
          <span className=" text-2xl font-bold text-blue-700 block mb-2">Title: 
            {lesson.title}
          </span>
          <p className=" text-gray-600 text-sm">
            {lesson.description?.slice(0, 100)}...
          </p>
        </di>

        <hr className="line border-t border-gray-200 mx-6" />

        <ul className="card__list p-6 space-y-2 text-sm text-gray-700">
          <li> Category: {lesson.category}</li>
          <li> Creator: {lesson.creator}</li>
          <li> Visibility: {lesson.visibility}</li>
          <li> Access: {lesson.accessLevel}</li>
        </ul>

        {(freeLesson || premiumUser) && (
          <div className="p-4 text-center">
            <Link
              to={`/lesson-details/${lesson._id}`}
              className="button bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
            >
              See Details →
            </Link>
          </div>
        )}
      </div>

      {/* Overlay for Premium lessons if user can't view */}
      {role === "user" && premiumLesson && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-white/50 backdrop-blur-sm rounded-xl">
          <p className="text-gray-800 font-semibold mb-4 flex items-center">
            <FaLock className="mr-2" /> Premium Lesson – Upgrade to view
          </p>
          <button
            onClick={() => navigate("/pricing-plan")}
            className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded shadow-lg hover:bg-yellow-600 transition"
          >
            Upgrade to Premium
          </button>
        </div>
      )}
    </div>
  );
};

export default LessonCard;
