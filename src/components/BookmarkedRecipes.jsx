import React, { useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toggleBookMark } from "../firebase/services";
import BookmarkedRecipe from "../ui/BookmarkedRecipe";

function BookmarkedRecipes({ bookmarkedRecipes, docId }) {
  const navigate = useNavigate();

  const navigateRecipe = function (id) {
    navigate(`/Recipe/${id}`);
  };
  return (
    <div>
      <h3 className="text-center mb-4 text-sm p-2">Saved Recipes</h3>
      <div className="flex flex-col gap-3">
        {bookmarkedRecipes &&
          bookmarkedRecipes.map((item, i) => (
            <BookmarkedRecipe
              key={item + i}
              image={item.image}
              title={item.title}
              recipe={item}
              id={item.id}
              recipeId={item.recipeId}
              onNavigate={navigateRecipe}
              docId={docId}
            />
          ))}
      </div>
    </div>
  );
}

export default BookmarkedRecipes;
