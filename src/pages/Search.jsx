import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/use-fetch";
import RecipeItem from "../ui/RecipeItem";

// ef3fbded5ccd4a71b118085f0def999a
function Search() {
  const { text } = useParams();
  const { data, error, loading } = useFetch(
    `/complexSearch?apiKey=9abede69dc0b4c65a28b17bc5d8a1694&query=${text}`
  );
  console.log(data);

  return (
    <div className="w-[80%] m-auto  py-10">
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
    </div>
  );
}

export default Search;
