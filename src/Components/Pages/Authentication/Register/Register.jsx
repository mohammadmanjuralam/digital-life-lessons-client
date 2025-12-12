import React from "react";
import { useForm } from "react-hook-form";

import { Link, useLocation, useNavigate } from "react-router";

import axios from "axios";
import useAxiosHooks from "../../../Controller/useAxiosHooks/useAxiosHooks";
import GoogleLogin from "../GoogleLogin/GoogleLogin";
import useAuth from "../../../Controller/useAuth/useAuth";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosHooks();
  console.log("from register", location);
  const { registerUser, updateUserProfile } = useAuth();
  const handleRegistration = async (data) => {
    console.log("registration field data", data);

    const profileImg = data.photo[0];
    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        //store the photo in formData
        const formData = new FormData();
        formData.append("image", profileImg);
        //store the photo and get url
        const image_Api_Url = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_photo_host_KEY
        }`;
        //fetch the imbb host key
        axios.post(image_Api_Url, formData).then((res) => {
          const photoURL = res.data.data.url;

          // user create
          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoUrl: photoURL,
          };
          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user created");
            } else {
              console.log(errors);
            }
          });
          //get user & update profile to firebase
          const userProfile = {
            displayName: data.name,
            photoUrl: photoURL,
          };
          updateUserProfile(userProfile)
            .then(() => {
              console.log("user profile updated done");
              navigate(location.state || "/");
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="card  w-150  shrink-0 mx-auto bg-gray-900 mt-20">
      <div className="card-body ">
        <form onSubmit={handleSubmit(handleRegistration)}>
          <fieldset className="fieldset">
            <h1 className="font-bold text-[42px] whitespace-nowrap">
              Create an Account
            </h1>
            <p className="py-2">Register with ZapShift</p>
            {/* Name */}
            <label className="label">Name</label>
            <input
              type="name"
              className="input w-full"
              {...register("name", {
                required: true,
              })}
              placeholder="Your Name"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500">Name Required</p>
            )}
            {/* photo */}
            <label className="label">Photo</label>
            <input
              type="file"
              className="file-input w-full"
              {...register("photo", {
                required: true,
              })}
              placeholder="Upload a file or image"
            />

            {/* {email field} */}
            <label className="label">Email</label>
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
              placeholder="Password "
            />
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">password must be 6 character long</p>
            )}

            <button className="btn bg-primary mt-4">Register</button>
            <p className="text-accent text-center">
              Already have any account?{" "}
              <Link
                state={location.state}
                className="text-primary font-bold"
                to="/login"
              >
                Login
              </Link>
            </p>
          </fieldset>
        </form>
        <GoogleLogin></GoogleLogin>
      </div>
    </div>
  );
};

export default Register;
