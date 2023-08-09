import Image from "next/image";
import { useRouter } from "next/router";
import * as Yup from "yup";
import Postro from "../../src/components/three/postro";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/apiRequest";
import { toast } from "react-toastify";
import React, { useState } from "react";

export default function SignUp() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [error, setError] = useState("");
  const formik = useFormik({
    initialValues: { userName: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Vui lòng nhập email"),
      userName: Yup.string()
        .required("Vui lòng nhập")
        .min(8, "Nhập lớn hơn 8 kí tự"),
      password: Yup.string().required("Vui lòng nhập"),
    }),
    onSubmit: async (values) => {
      try {
        await registerUser(values, dispatch);
        router.push("/");
      } catch (error) {
        console.log(error);
        setError(error?.message);
      }
    },
  });

  return (
    <>
      <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-1 ...">
        <div className="col-span-2">
          <Postro />
        </div>
        <div className="flex">
          <div className="flex flex-col items-center justify-center w-full">
            <div className="w-full max-w-md space-y-8">
              <div>
                <h1 className="text-2xl font-bold">Welcome back!</h1>
                <p className="mt-2 text-gray-600">
                  Please sign in to your account.
                </p>
                <p>{error}</p>
              </div>
              <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block font-bold text-white-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.email && (
                    <p className="msg__err">{formik.errors.email}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="userName"
                    className="block font-bold text-white-700"
                  >
                    Tên Đăng nhập
                  </label>
                  <input
                    id="userName"
                    type="userName"
                    placeholder="Nhập tên của bạn"
                    className="w-full px-4 py-3 mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.userName && (
                    <p className="msg__err">{formik.errors.userName}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block font-bold text-white-700"
                  >
                    Mật khẩu
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.password && (
                    <p className="msg__err">{formik.errors.password}</p>
                  )}
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full px-4 py-3 font-bold text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700"
                  >
                    Đăng ký
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
