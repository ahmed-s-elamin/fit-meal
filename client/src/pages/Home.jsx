import { useState, useEffect } from "react";
import axios from "axios";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);

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

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h1>{recipe.name}</h1>
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
