import React, { useEffect, useState } from "react";

const useFetch = function () {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getStoredRecipes = localStorage.getItem("popular");
    const getData = async function () {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=ef3fbded5ccd4a71b118085f0def999a&number=15`
        );

        console.log(res, "res from use fetch");

        if (!res) throw new Error(res);

        const data = await res.json();
        localStorage.setItem("popular", JSON.stringify(data.recipes));
        setData(data.recipes);
      } catch (error) {
        setError(error.message);
      }

      setLoading(false);
    };

    if (getStoredRecipes) {
      setData(getStoredRecipes);
    } else {
      getData();
    }
  }, []);

  return { data, error, loading };
};
export default useFetch;
