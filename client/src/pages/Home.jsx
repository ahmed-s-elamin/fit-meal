import { useState, useEffect } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:3030/recipes");
      setRecipes(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3030/recipes", {
        recipeID,
        userID,
      });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h1>{recipe.name}</h1>
              <button onClick={() => saveRecipe(recipe._id)}>Save</button>
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src="{recipe.imageUrl}" alt="{recipe.name}" />
            <p> Cooking Time: {recipe.cookingTime} (minutes)</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
