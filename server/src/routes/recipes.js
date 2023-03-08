import express from "express";
import mongoose from "mongoose";
import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";

const router = express.Router();

//fetching all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await RecipeModel.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//creating a recipe
router.post("/", async (req, res) => {
  const recipe = new RecipeModel(req.body);
  try {
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//saved recipes
router.put("/", async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);
    user.savedRecipes.push(recipe);
    await user.save();
    res.status(201).json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/savedRecipes/ids", async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userID);
    res.json({ savedRecipes: user?.savedRecipes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//returning saved recipes
router.get("/savedRecipes", async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userID);
    const savedRecipes = await RecipeModel.find({
      _id: { $in: user.savedRecipes },
    });

    res.json({ savedRecipes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export { router as recipesRouter };
