import React, { useEffect, useState } from "react";

const useFetch = function (url, name) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getStoredRecipes = localStorage.getItem("popular");
    const getData = async function () {
      try {
        setLoading(true);
        const res = await fetch(`https://api.spoonacular.com/recipes${url}`);

        // console.log(res, "res from use fetch");

        if (!res) throw new Error(res);

        const data = await res.json();
        if (name == "popular") {
          localStorage.setItem("popular", JSON.stringify(data.recipes));
        }

        setData(data);
      } catch (error) {
        setError(error.message);
      }

      setLoading(false);
    };

    if (name == "popular") {
      if (getStoredRecipes) {
        setData(JSON.parse(getStoredRecipes));
      }
    } else {
      getData();
    }
  }, [url]);

  return { data, error, loading };
};
export default useFetch;
