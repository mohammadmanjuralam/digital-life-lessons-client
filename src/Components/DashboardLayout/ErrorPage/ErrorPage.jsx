import React from "react";
import errorImg from "../../../assets/errorpage.jpeg";
import { Link } from "react-router";
const ErrorPage = () => {
  return (
    <div className="w-full h-screen flex-col flex justify-center items-center ">
      <img className="max-w-full max-h-full object-contain" src={errorImg} />
      <Link className="bg-primary px-3 py-4 font-bold rounded-xl" to="/">
        Back to home
      </Link>
    </div>
  );
};

export default ErrorPage