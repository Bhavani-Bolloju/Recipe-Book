import React, { useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { signUp, home } from "../constants/routes";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitFormHandler = async function (e) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (!res) throw new Error("incorrect credentails");
      navigate(home);
    } catch (error) {
      setError(error.message);
    }
    setEmail("");
    setPassword("");
    setLoading(false);
  };

  return (
    <div className="h-[90vh] flex items-center justify-center">
      <form
        onSubmit={submitFormHandler}
        className="flex rounded-md bg-white flex-col w-[400px] py-20 px-14 gap-6 shadow-sm text-sm"
      >
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
          Login
        </button>
        {loading && (
          <ImSpinner3
            className={`text-center self-center text-sm animate-spin`}
          />
        )}
        {error && <p className="text-md text-red-400">{error}</p>}
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
