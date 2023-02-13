import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import { ImSpinner3 } from "react-icons/im";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitFormHandler = async function (e) {
    e.preventDefault();
    console.log(username, email, password);
    if (
      username.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      return;
    }

    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(auth, email, password);

      console.log(res);
      if (!res) throw new Error("user already exists");

      await addDoc(collection(db, "users"), {
        uid: res?.user?.uid,
        username,
        bookmarkedRecipe: [],
      });

      navigate("/");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="h-[90vh] flex items-center justify-center">
      <form
        onSubmit={submitFormHandler}
        className="flex rounded-md bg-white flex-col w-[400px] py-20 px-14 gap-6 shadow-sm text-sm"
      >
        <input
          type="text"
          className="border-b focus:outline-none p-2 border-[#FCF3E5] placeholder:text-sm bg-transparent "
          placeholder="username"
          required
          name="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError(null);
          }}
        />
        <input
          type="email"
          className="border-b focus:outline-none p-2 border-[#fbf4d4] placeholder:text-sm"
          placeholder="email"
          required
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(null);
          }}
        />
        <input
          type="text"
          name="password"
          className="border-b focus:outline-none p-2 border-[#fbf4d4] placeholder:text-sm"
          placeholder="password"
          minLength="8"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(null);
          }}
        />
        <button className=" self-center px-7 py-1.5 rounded-md font-normal bg-[#FAECD6] hover:shadow-md text-sm mt-5 focus:outline-none">
          SignIn
        </button>
        {loading && (
          <ImSpinner3
            className={`text-center self-center text-sm animate-spin`}
          />
        )}
        {error && <p className="text-md text-red-400">{error}</p>}
        <p className="text-xs text-center">Don't have an account? signup</p>
      </form>
    </div>
  );
}

export default SignUp;
