import React, { useContext, useEffect, useState } from "react";
import { getUserByUserId } from "../firebase/services";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";

function Profile() {
  const { userAuth } = useContext(AuthContext);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async function () {
      const res = await getUserByUserId(userAuth.uid);
      console.log(res);
      setUser(res);
    };

    if (userAuth.uid) {
      getUser();
    }
  }, [userAuth.uid]);

  return (
    <div className=" w-[60%] m-auto p-10">
      {user && (
        <div className="bg-[#fff5c7]  rounded-md min-h-[80vh] p-5">
          <div className="p-5  flex items-center gap-5 border-b">
            <div className="bg-[#edde9c]  w-16 h-16 rounded-full flex items-center justify-center text-4xl font-semibold">
              {user.username.slice(0, 1)}
            </div>
            <p>{user.username}</p>
          </div>
          <div>
            <h3 className="text-center text-sm p-2">Saved Recipes</h3>
            <div>
              {user.bookmarkedRecipe.map((recipe) => (
                <Link
                  key={recipe.id}
                  to={`/Recipe/${recipe.id}`}
                  className="flex items-center rounded-lg gap-5 bg-[#fffbe9] p-2"
                >
                  <img
                    src={recipe.image}
                    className="w-16 h-16 rounded-full object-cover"
                    alt=""
                  />
                  <p className="text-sm">{recipe.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
