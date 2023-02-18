import React, { useState, useReducer } from "react";
import { ImSpinner3 } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { signUp, home } from "../constants/routes";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { formReducer } from "../ui/formReducer";

const initialValue = {
  email: "",
  password: "",
  loading: false,
  error: null,
};

function Login() {
  const [formValues, dispatchForm] = useReducer(formReducer, initialValue);
  const navigate = useNavigate();

  const submitFormHandler = async function (e) {
    e.preventDefault();
    try {
      dispatchForm({ type: "loading", value: true });
      const res = await signInWithEmailAndPassword(
        auth,
        formValues.email,
        formValues.password
      );
      if (!res) throw new Error("incorrect credentails");
      navigate(home);
    } catch (error) {
      dispatchForm({ type: "error", value: error.message });
    }

    dispatchForm({ type: "reset" });
  };

  return (
    <div className="h-[90vh] flex flex-col items-center justify-center">
      <h1 className="mb-20 text-2xl heading-font tracking-wider text-[#F3D099]">
        Bring Restaurant Like Taste At Home
      </h1>

      <form
        onSubmit={submitFormHandler}
        className="flex rounded-md bg-white flex-col w-[400px] py-20 px-14 gap-6 shadow-xl text-sm"
      >
        <input
          type="email"
          className="border-b focus:outline-none p-2 border-[#fbf4d4] placeholder:text-sm"
          placeholder="email"
          required
          name="email"
          value={formValues.email}
          onChange={(e) => {
            dispatchForm({ type: "email", value: e.target.value });
            dispatchForm({ type: "error", value: null });
          }}
        />
        <input
          type="text"
          name="password"
          className="border-b focus:outline-none p-2 border-[#fbf4d4] placeholder:text-sm"
          placeholder="password"
          minLength="8"
          value={formValues.password}
          onChange={(e) => {
            dispatchForm({ type: "password", value: e.target.value });
            dispatchForm({ type: "error", value: null });
          }}
        />
        <button className=" self-center px-7 py-1.5 rounded-md font-normal bg-[#FAECD6] hover:shadow-md text-sm mt-5 focus:outline-none">
          Login
        </button>
        {formValues.loading && (
          <ImSpinner3
            className={`text-center self-center text-sm animate-spin`}
          />
        )}
        {formValues.error && (
          <p className="text-md text-red-400">{formValues.error}</p>
        )}
        <p className="text-xs text-center">
          Don't have an account?{" "}
          <Link className="hover:border-b-2 border-blue-200" to={signUp}>
            signup
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
