import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/use-fetch";
import { FaBookmark } from "react-icons/fa";
import { AuthContext } from "../context/authContext";
import {
  toggleBookMark,
  getUserByUserId,
  isBookMarked,
} from "../firebase/services";
import LoadSpinner from "../ui/LoadSpinner";

function Recipe() {
  const params = useParams();
  const id = params.id;
  const [bookmark, setBookmark] = useState(false);

  const { userAuth } = useContext(AuthContext);

  const { data, error, loading } = useFetch(
    `/${id}/information?apiKey=ef3fbded5ccd4a71b118085f0def999a`
  );

  let detailedRecipe = useEffect(() => {
    const getStatus = async function () {
      const res = await isBookMarked(userAuth.uid, id);
      setBookmark(res);
    };

    if (userAuth.uid) {
      getStatus();
    }
  }, []);

  const bookmarkHandler = async function () {
    setBookmark((prev) => !prev);

    const user = await getUserByUserId(userAuth.uid);
    toggleBookMark(user.docId, bookmark, {
      image: data?.image,
      title: data?.title,
      recipeId: data?.id,
    });
  };

  return (
    <div className="flex items-center justify-center">
      {error && <p className="text-center text-red-400 ">{error}</p>}
      {loading && <LoadSpinner />}
      {data && (
        <div className="w-[70%] h-fit m-auto py-10 pb-32 flex relative   flex-col gap-10">
          <FaBookmark
            onClick={bookmarkHandler}
            className={`self-end absolute  text-xl hover:cursor-pointer ${
              bookmark ? "fill-red-400" : "fill-gray-400"
            }`}
          />

          <div className="flex max-lg:flex-col-reverse   gap-10 items-center">
            <img
              src={data?.image}
              alt={data?.title}
              className="h-[350px] rounded-md object-cover max-xl:w-[450px]"
            />
            <div className="flex flex-col">
              <h3 className="text-4xl font-semibold text-[#3f3400] text-center">
                {data?.title}
              </h3>
              {data?.dishTypes && (
                <p className="mt-3 text-end rounded-full px-2">
                  -- {data?.dishTypes}
                </p>
              )}
              <div className="flex justify-center gap-5 mt-5">
                <p className="text-sm border border-[#d5b720] rounded-full px-2 py-1">
                  servings{" "}
                  <span className="font-semibold">{data?.servings}</span>
                </p>
                <p className="text-sm py-1 border border-[#d5b720] rounded-full px-2">
                  prep
                  <span className="font-semibold">
                    {" "}
                    {data?.readyInMinutes}m
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex  maz-lg:h-full  max-lg:gap-24 max-lg:flex-col gap-10 justify-between">
            <div className="px-5 h-[350px] basis-[50%]  border-r max-lg:border-none pr-10">
              <h2 className="text-center mb-5 text-xl font-semibold">
                Ingredients
              </h2>
              <ul className="flex flex-col gap-3 text-sm overflow-y-auto scrollbar-hide h-full px-5">
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
            <div className="basis-[50%] h-[350px]">
              <h2 className="text-center mb-5 text-xl font-semibold">
                Instructions
              </h2>
              <ul className="flex flex-col gap-3 h-full scrollbar-hide overflow-y-auto text-sm">
                {data?.analyzedInstructions[0] ? (
                  data?.analyzedInstructions[0].steps.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 ">
                      <p>{item.number}</p>
                      <p>{item.step}</p>
                    </li>
                  ))
                ) : (
                  <p
                    className="text-md leading-8"
                    dangerouslySetInnerHTML={{ __html: data?.summary }}
                  ></p>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Recipe;
