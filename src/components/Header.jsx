import React, { useContext, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { AuthContext } from "../context/authContext";
import { query, collection, getDocs, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { getUserByUserId } from "../firebase/services";
import logo from "../../public/chef.svg";

function Header() {
  const { userAuth } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async function () {
      const data = await getUserByUserId(userAuth.uid);
      // console.log(data, "data");
      setUserDetails(data);
    };

    if (userAuth?.uid) {
      getUser();
    }
  }, [userAuth?.uid]);

  const searchRecipeHandler = function (e) {
    e.preventDefault();

    if (searchInput.trim() === "") return;
    console.log();

    navigate(`/Search/${searchInput}`);
  };

  const userProfileHandler = function () {
    navigate("/Profile");
  };

  const navigateHomeHandler = function () {
    navigate("/home");
  };

  return (
    <header className=" h-16 relative heading-font">
      <div className="z-50 bg-[#fffbe9]/70 backdrop-blur-lg shadow-md fixed-height w-[100%] fixed">
        <div className=" flex justify-around items-center fixed-height">
          <h1 className="text-lg flex items-center gap-1">
            <img src={logo} alt="" className="w-4 h-4" />
            <button onClick={navigateHomeHandler}>Recipe</button>
          </h1>
          <div className="flex items-center justify-end gap-16">
            {userAuth && (
              <form
                onSubmit={searchRecipeHandler}
                className="flex items-center justify-end w-[400px]"
              >
                <input
                  type="text"
                  className="bg-white w-[60%] border focus:outline-none rounded-full p-1 px-3 focus:w-[100%]"
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button className="-ml-8">
                  <BiSearch className="text-gray-400 text-xl" />
                </button>
              </form>
            )}
            {userAuth && (
              <button
                onClick={userProfileHandler}
                className="w-11 h-11 rounded-full bg-[#edde9c] flex items-center justify-center"
              >
                {userDetails && (
                  <>
                    <p className="text-xl">
                      {userDetails.username.slice(0, 1)}{" "}
                    </p>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
