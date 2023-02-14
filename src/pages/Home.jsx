import React from "react";
import useFetch from "../hooks/use-fetch";
import { Link } from "react-router-dom";
import RecipeItem from "../ui/RecipeItem";

function Home() {
  const { data, error, loading } = useFetch(
    "/random?apiKey=ef3fbded5ccd4a71b118085f0def999a&number=15",
    "popular"
  );

  return (
    <div className="h-[100vh]">
      <div className="w-[80%] m-auto  py-10">
        <ul className="flex flex-wrap gap-10 items-center justify-center">
          {data &&
            data.map((item) => (
              <RecipeItem
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
              />
              // <Link
              //   to={`/Recipe/${item.id}`}
              //   key={item.id}
              //   className="w-[350px] h-[250px] rounded-lg overflow-hidden"
              // >
              //   <div className="group h-full w-full relative overflow-hidden">
              //     <img
              //       src={item?.image}
              //       alt=""
              //       className="w-[100%] z-10 h-[100%] object-cover absolute"
              //     />
              //     <div className="min-h-[40%]  rounded-sm z-30 w-[70%] bg-[#fffbe9]/50 bottom-0 left-0 absolute group-hover:translate-y-[100%] duration-150 p-2 text-center text-sm px-4 font-semibold flex items-center justify-center flex-wrap backdrop-blur-sm">
              //       {item.title}
              //     </div>
              //   </div>
              // </Link>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
