import React from "react";
import useFetch from "../hooks/use-fetch";
import { Link } from "react-router-dom";

function Home() {
  const { data, error, loading } = useFetch();
  console.log(data);
  return (
    <div className="h-[100vh]">
      <div className="w-[80%] m-auto bg-pink-50  py-10">
        <ul className="flex flex-wrap gap-10 items-center justify-center">
          {data &&
            data.map((item) => (
              <Link
                to={`${item.id}`}
                key={item.id}
                className="w-[350px] h-[250px] rounded-lg overflow-hidden"
              >
                <div className="group h-full w-full relative overflow-hidden">
                  <img
                    src={item?.image}
                    alt=""
                    className="w-full z-10 h-full object-cover absolute"
                  />
                  <div className="min-h-[40%]  rounded-sm z-30 w-[70%] bg-[#fffbe9]/70 bottom-0 left-0 absolute group-hover:translate-y-[100%] duration-150 p-2 text-center text-lgs font-semibold flex items-center justify-center flex-wrap">
                    {item.title}
                  </div>
                </div>
              </Link>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
