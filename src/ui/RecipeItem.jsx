import React from "react";
import { Link } from "react-router-dom";

function RecipeItem({ id, image, title }) {
  return (
    <Link
      to={`/Recipe/${id}`}
      // key={item.id}
      className="w-[350px] h-[250px] rounded-lg overflow-hidden"
    >
      <div className="group h-full w-full relative overflow-hidden">
        <img
          src={image}
          alt=""
          className="w-[100%] z-10 h-[100%] object-cover absolute"
        />
        <div className="min-h-[40%]  rounded-sm z-30 w-[70%] bg-[#fffbe9]/50 bottom-0 left-0 absolute group-hover:translate-y-[100%] duration-150 p-2 text-center text-sm px-4 font-semibold flex items-center justify-center flex-wrap backdrop-blur-sm">
          {title}
        </div>
      </div>
    </Link>
  );
}

export default RecipeItem;
