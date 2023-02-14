import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/use-fetch";

// /random?apiKey=ef3fbded5ccd4a71b118085f0def999a&number=15

function Recipe() {
  const params = useParams();
  const id = params.id;
  const { data, error, loading } = useFetch(
    `/${id}/information?apiKey=ef3fbded5ccd4a71b118085f0def999a`
  );
  // const storeRecipe = localStorage.setItem("recipe", JSON.stringify(data));

  // const data = JSON.parse(localStorage.getItem("recipe"));
  // console.log(data);

  return (
    <div className="w-[70%] m-auto py-10 pb-32 flex flex-col gap-5">
      <div className="flex gap-12 items-center">
        <img
          src={data?.image}
          alt={data?.title}
          className="h-[350px] object-cover"
        />
        <div className="flex flex-col">
          <h3 className="text-4xl font-semibold text-[#3f3400] text-center">
            {data?.title}
          </h3>
          <p className="mt-3 text-end rounded-full px-2">
            --{data?.dishTypes[0]}
          </p>
          <div className="flex justify-center gap-5 mt-5">
            <p className="text-sm border border-[#d5b720] rounded-full px-2 py-1">
              servings <span className="font-semibold">{data?.servings}</span>
            </p>
            <p className="text-sm py-1 border border-[#d5b720] rounded-full px-2">
              prep
              <span className="font-semibold"> {data?.readyInMinutes}m</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex h-[400px] gap-10 justify-between">
        <div className="px-10 basis-[50%]  border-r pr-10">
          <h2 className="text-center mb-5 text-xl font-semibold">
            Ingredients
          </h2>
          <ul className="flex flex-col gap-3 text-sm">
            {data?.extendedIngredients.map((item) => (
              <li key={item.id} className="flex justify-between">
                <p className="capitalize">{item?.name}</p>
                <p className="font-semibold">
                  {item?.amount} {item?.unit}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="basis-[50%] h-[400px]">
          <h2 className="text-center mb-5 text-xl font-semibold">
            Instructions
          </h2>
          <ul className="flex flex-col gap-3 h-full scrollbar-hide overflow-y-scroll">
            {data?.analyzedInstructions[0].steps.map((item, i) => (
              <li key={i} className="flex items-start gap-3 ">
                <p>{item.number}</p>
                <p>{item.step}</p>
                <p></p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Recipe;