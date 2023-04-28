import React, { useState, useReducer } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import { ImSpinner3 } from "react-icons/im";
import { useNavigate, Link } from "react-router-dom";
import { home, logIn } from "../constants/routes";
import { formReducer } from "../ui/formReducer";
import { GiCampCookingPot } from 'react-icons/gi';

const initialValue = {
  email: "",
  password: "",
  loading: false,
  error: null,
};

function SignUp() {
  const [formValues, dispatchForm] = useReducer(formReducer, initialValue);

  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const submitFormHandler = async function (e) {
    e.preventDefault();

    if (
      username.trim() === "" ||
      formValues.email.trim() === "" ||
      formValues.password.trim() === ""
    ) {
      return;
    }

    try {
      dispatchForm({ type: "loading", value: true });
      const res = await createUserWithEmailAndPassword(
        auth,
        formValues.email,
        formValues.password
      );
      if (!res) throw new Error("user already exists");

      await addDoc(collection(db, "users"), {
        uid: res?.user?.uid,
        username,
        bookmarkedRecipe: [],
      });

      navigate(home);
    } catch (error) {
      dispatchForm({ type: "error", value: error.message });
    }

    dispatchForm({ type: "reset" });
    setUsername("");
  };

  return (
    <div className="h-[100vh] flex flex-col items-center bg-[#FAECD6]">
    <h1 className="mb-20 flex flex-col gap-2 items-center text-3xl mt-24 heading-font uppercase tracking-wider text-[#fff] font-bold">
      <span>
      Bring Restaurant Like Taste At Home
      </span>
      </h1>
      
      <form
        onSubmit={submitFormHandler}
        className="flex rounded-md bg-white flex-col w-[400px] pb-20 pt-10 px-14 gap-6 shadow-sm text-sm"
      >
        <GiCampCookingPot className="w-8 h-8 self-center mb-5 text-[#eadbd6]"/>
        <input
          type="text"
          className="border-b focus:outline-none p-2 border-[#FCF3E5] placeholder:text-sm bg-transparent "
          placeholder="username"
          required
          name="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            dispatchForm({ type: "error", value: null });
          }}
        />
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
          SignIn
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
          Already have an account?{" "}
          <Link className="hover:border-b-2 border-blue-200" to={logIn}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
