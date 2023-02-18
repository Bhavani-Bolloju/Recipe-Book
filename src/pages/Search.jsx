import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/use-fetch";
import LoadSpinner from "../ui/LoadSpinner";
import RecipeItem from "../ui/RecipeItem";

// ef3fbded5ccd4a71b118085f0def999a
function Search() {
  const { text } = useParams();
  const { data, error, loading } = useFetch(
    `/complexSearch?apiKey=9abede69dc0b4c65a28b17bc5d8a1694&query=${text}`
  );

  // console.log(data);

  let recipe = (
    <ul className="flex flex-wrap gap-10 items-center justify-center">
      {data &&
        data?.results?.map((recipe) => (
          <RecipeItem
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            image={recipe.image}
          />
        ))}
    </ul>
  );

  if (error) {
    recipe = <p className="text-center">{error}</p>;
  }

  if (loading) {
    recipe = <LoadSpinner />;
  }

  if (data && data.results.length <= 0) {
    recipe = <p className="text-center text-blue-500">no recipes found....</p>;
  }

  return (
    <div className="w-[80%] max-lg:w-[90%] flex items-center justify-center m-auto  py-10">
      {recipe}
    </div>
  );
}

export default Search;
