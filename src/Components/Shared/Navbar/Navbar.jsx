import "./Navbar.css";
import { NavLink } from "react-router";
import { AuthContext } from "../../Controller/AuthContext/AuthContext";
import Login from "../../Pages/Authentication/Login/Login";
import useAuth from "../../Controller/useAuth/useAuth";
import { FaUser, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const handleLogOut = () => {
    logOut()
      .then()
      .catch((error) => {
        console.log(error);
      });
  };
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      {user ? (
        <>
          <li>
            <NavLink to="/dashboard/add-lesson">Add Lesson</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/my-lessons">My Lesson</NavLink>
          </li>
          <li>
            <NavLink to="/public-lessons">Public Lesson</NavLink>
          </li>
          <li>
            <NavLink to="/pricing-plan">Pricing Plan</NavLink>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="navbar button-container shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost  text-4xl font-extrabold bg-linear-to-r from-pink-500 to-indigo-500 text-transparent bg-clip-text">
          <span className="text-purple-400">Digital</span>{" "}
          <span className="text-orange-500">Life</span> Session
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <>
            <span>Profile</span>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-gray-200">
                  {user?.photoURL ? (
                    <img
                      alt="user avatar"
                      referrerPolicy="no-referrer"
                      src={user.photoURL}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUserCircle className="text-3xl text-gray-500" />
                  )}
                </div>
              </label>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <NavLink to="/profile" className="justify-between">
                    Profile
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>

                <li>
                  <button onClick={handleLogOut} className="text-red-500">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Navbar;
