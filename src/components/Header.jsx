import React, { useContext } from "react";
import { BiSearch } from "react-icons/bi";
import { AuthContext } from "../context/authContext";

function Header() {
  const { userAuth } = useContext(AuthContext);
  console.log(userAuth);

  return (
    <header className=" h-16 relative">
      <div className="z-50 bg-[#fffbe9]/70 backdrop-blur-lg shadow-md fixed-height w-[100%] fixed">
        <div className=" flex justify-around items-center fixed-height">
          <h1 className="text-lg">Recipe</h1>
          <div className="flex items-center justify-end gap-16">
            <form className="flex items-center justify-end w-[400px]">
              <input
                type="text"
                className="bg-white w-[60%] border focus:outline-none rounded-full p-1 px-3 focus:w-[100%]"
              />
              <button className="-ml-8">
                <BiSearch className="text-gray-400 text-xl" />
              </button>
            </form>
            <div className="w-11 h-11 rounded-full bg-green-200"></div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
