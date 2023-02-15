import React, { useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { toggleBookMark } from "../firebase/services";

function BookmarkedRecipe({
  id,
  recipeId,
  image,
  docId,
  title,
  recipe,
  onNavigate,
}) {
  const [bookmarked, setBookmarked] = useState(true);

  const bookmarkHandler = async function (recipe) {
    console.log(recipe, "recipe");
    toggleBookMark(docId, bookmarked, {
      image: recipe?.image,
      title: recipe?.title,
      recipeId: recipe?.recipeId,
    });
    setBookmarked((prev) => !prev);
  };

  // console.log(id);

  return (
    <div
      onClick={() => {
        onNavigate(recipeId);
      }}
      className="flex items-center rounded-lg gap-5 bg-[#fffbe9] w-[80%] m-auto p-2 hover:cursor-pointer"
    >
      <img src={image} className="w-14 h-14 rounded-full object-cover" alt="" />
      <p className="text-sm">{title}</p>
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
  );
}

export default BookmarkedRecipe;
