import React, { useContext, useEffect, useState } from "react";
import { getUserByUserId } from "../firebase/services";
import { AuthContext } from "../context/authContext";

import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import BookmarkedRecipes from "../components/BookmarkedRecipes";

function Profile() {
  const { userAuth } = useContext(AuthContext);

  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // console.log(user);

  useEffect(() => {
    const getUser = async function () {
      const res = await getUserByUserId(userAuth.uid);
      setUser(res);
    };

    if (userAuth.uid) {
      getUser();
    }
  }, [userAuth?.uid]);

  return (
    <div className=" w-[60%] m-auto p-10">
      {user && (
        <div className="bg-[#fff5c7]  rounded-md min-h-[80vh] p-5">
          <div className="p-5  flex items-center gap-5 border-b">
            <div className="bg-[#edde9c]  w-16 h-16 rounded-full flex items-center justify-center text-4xl font-semibold">
              {user.username.slice(0, 1)}
            </div>
            <p>{user.username}</p>
            <button
              className=" flex-1 text-end"
              onClick={() => {
                navigate("signUp");
                signOut(auth);
              }}
            >
              <span className="bg-[#edde9c] inline-block px-4 py-1 text-sm rounded-md">
                Logout
              </span>
            </button>
          </div>
          {user && (
            <BookmarkedRecipes
              bookmarkedRecipes={user.bookmarkedRecipe}
              docId={user.docId}
            />
          )}
          {/* <div>
            <h3 className="text-center mb-4 text-sm p-2">Saved Recipes</h3>
            <div className="flex flex-col gap-3">
              {user.bookmarkedRecipe.map((recipe) => (
                <div
                  key={recipe.id}
                  onClick={() => {
                    navigateRecipe(recipe.recipeId);
                  }}
                  // to={`/Recipe/${recipe.recipeId}`}
                  className="flex items-center rounded-lg gap-5 bg-[#fffbe9] w-[80%] m-auto p-2 hover:cursor-pointer"
                >
                  <img
                    src={recipe.image}
                    className="w-14 h-14 rounded-full object-cover"
                    alt=""
                  />
                  <p className="text-sm">{recipe.title}</p>
                  <FaBookmark
                    onClick={(e) => {
                      e.stopPropagation();
                      bookmarkHandler(recipe);
                    }}
                    className={`ml-auto mr-4 ${
                      bookmarked ? "fill-red-400" : "fill-gray-500"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
}

export default Profile;
