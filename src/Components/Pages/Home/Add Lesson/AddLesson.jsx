import React from "react";
import { useForm } from "react-hook-form";
import useAxiosHooks from "../../../Controller/useAxiosHooks/useAxiosHooks";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../Controller/useAuth/useAuth";

const AddLesson = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      emotional: "",
      visibility: "Public",
      accessLevel: "Free",
    },
  });
  const axiosSecure = useAxiosHooks();

  const submitHandler = async (data) => {
    console.log("created submit button");
    try {
      const res = await axiosSecure.post("/add-lesson", {
        title: data.title,
        description: data.description,
        category: data.category,
        emotional: data.emotional,
        visibility: data.visibility,
        accessLevel: data.accessLevel,
        email: user.email,
      });

      console.log("Lesson created:", res.data);
      if (res.data._id) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Lesson has been created Successfully",
          showConfirmButton: false,
          timer: 2500,
        });
        navigate("/dashboard/my-lessons");
      }
      reset();
    } catch (err) {
      console.error("Error creating lesson:", err);
    }
  };
  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg text-black rounded-xl mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Create Life Lesson
      </h2>
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
        {/* Title */}
        <div>
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Title"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Description"
            rows={4}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Category & Emotional */}
        {/* Category & Emotional */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Category Select */}
          <div className="flex flex-col">
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full p-3 border-2 border-purple-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="">Select Category</option>
              <option value="Mindset">Mindset</option>
              <option value="Career">Career</option>
              <option value="Personal Growth">Personal Growth</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Emotional Tone Select */}
          <div className="flex flex-col">
            <select
              {...register("emotional", {
                required: "Emotional tone is required",
              })}
              className="w-full p-3 border-2 border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Select Emotional Tone</option>
              <option value="Motivational">Motivational</option>
              <option value="Sad">Sad</option>
              <option value="Realization">Realization</option>
              <option value="Happy">Happy</option>
              <option value="Inspiring">Inspiring</option>
            </select>
            {errors.emotional && (
              <p className="text-red-500 text-sm mt-1">
                {errors.emotional.message}
              </p>
            )}
          </div>
        </div>

        {/* Visibility & Access Level */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <select
            {...register("visibility")}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
          <br />

          <select
            {...register("accessLevel")}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Free">Free</option>
            <option value="Premium">Premium</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          Create Lesson
        </button>
      </form>
    </div>
  );
};

export default AddLesson;
