import React from "react";
import { FaBookmark } from "react-icons/fa";

function BookmarkedRecipe({
  id,
  recipeId,
  image,
  title,
  recipe,
  onBookmark,
  isBookmarked,
  onNavigate,
}) {
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
          onBookmark(recipe);
        }}
        className={`ml-auto mr-4 ${
          isBookmarked ? "fill-red-400" : "fill-gray-500"
        }`}
      />
    </div>
  );
}

export default BookmarkedRecipe;
