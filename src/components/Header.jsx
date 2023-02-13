import React from "react";
import { BiSearch } from "react-icons/bi";

function Header() {
  return (
    <header className=" h-16 relative">
      <div className="z-50 bg-[#fffbe9]/70 backdrop-blur-lg shadow-md fixed-height w-[100%] fixed">
        <div className=" flex justify-around items-center fixed-height">
          <h1>Recipe</h1>
          <div className="flex gap-20">
            <form className="">
              <input type="text" className="bg-gray-100" />
              <button>
                <BiSearch />
              </button>
            </form>
            <div>user</div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
