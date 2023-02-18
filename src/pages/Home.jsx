import React from "react";
import useFetch from "../hooks/use-fetch";
import { Link } from "react-router-dom";
import RecipeItem from "../ui/RecipeItem";
import LoadSpinner from "../ui/LoadSpinner";

function Home() {
  const { data, error, loading } = useFetch(
    "/random?apiKey=ef3fbded5ccd4a71b118085f0def999a&number=15",
    "popular"
  );

  // console.log(data, error, loading);
  let recipeData = (
    <ul className="flex flex-wrap gap-10 items-center justify-center">
      {data &&
        data.recipes.map((item) => (
          <RecipeItem
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.image}
          />
        ))}
    </ul>
  );

  if (error) {
    recipeData = <p className="text-red-400 text-center">{error}</p>;
  }

  if (loading) {
    recipeData = <LoadSpinner />;
  }

  return (
    <div className="h-[100vh]">
      <div className="w-[80%] m-auto flex items-center justify-center py-10">
        {recipeData}
      </div>
    </div>
  );
}

export default Home;
