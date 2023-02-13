import React from "react";
import useFetch from "../hooks/use-fetch";

function Home() {
  const { data, error, loading } = useFetch();
  console.log(data);
  return <div>Home</div>;
}

export default Home;
