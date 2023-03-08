import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const CreateRecipe = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instrctions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredient = (e, index) => {
    const { value } = e.target;
    const ingredients = recipe.ingredients;
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
    console.log(recipe);
  };

  const addIngredient = () => {
    //ingredients will have prev ingredient + new one
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  //console.log(recipe);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("htp://localhost:3030/recipes", recipe);
      toast.success("Recipe created!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="create-recipe">
      <h1>Create A Recipe</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={handleChange} />

        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            name="ingredients"
            value={ingredient}
            onChange={(e) => handleIngredient(e, index)}
          />
        ))}
        <button type="button" onClick={addIngredient}>
          Add Ingredient
        </button>

        <label htmlFor="instrctions">Instrctions</label>
        <textarea
          type="text"
          id="instrctions"
          name="instrctions"
          onChange={handleChange}
        />

        <label htmlFor="imageUrl">ImageURL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          onChange={handleChange}
        />

        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          onChange={handleChange}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};
