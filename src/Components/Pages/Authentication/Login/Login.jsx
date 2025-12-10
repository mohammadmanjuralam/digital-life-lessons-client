import React from "react";
import { useForm } from "react-hook-form";

import { Link, useLocation, useNavigate } from "react-router";

import useAuth from "../../../Controller/useAuth/useAuth";
import GoogleLogin from "../GoogleLogin/GoogleLogin";

const Login = () => {
  const { signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleLogin = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 ">
      <div className="card-body ">
        <form onSubmit={handleSubmit(handleLogin)}>
          <fieldset className="fieldset">
            <h1 className="font-bold text-[42px]">Welcome Back</h1>
            <p className="py-2">Login with ZapShift</p>
            <label className="label">Email</label>
            {/* {email field} */}
            <input
              type="email"
              className="input w-full"
              {...register("email", {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              })}
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email Required</p>
            )}
            {errors.email?.type === "pattern" && (
              <p className="text-red-500">Email Formate invalid</p>
            )}
            <label className="label">Password</label>
            {/* {password field} */}
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="input w-full"
              placeholder="Password"
            />
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">password must be 6 character long</p>
            )}
            <div>
              <Link
                to="/auth/forget"
                className="link link-hover underline text-accent"
              >
                Forgot password?
              </Link>
            </div>
            <button className="btn bg-primary mt-4">Login</button>
            <p className="text-accent">
              Don't have any account?{" "}
              <Link
                state={location.state || "/"}
                className="text-primary font-bold"
                to="/register"
              >
                Register
              </Link>
            </p>
          </fieldset>
        </form>
        <GoogleLogin></GoogleLogin>
      </div>
    </div>
  );
};

export default Login;
