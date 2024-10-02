const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');
const Ingredients = require("../models/ingredient.js")

router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find( {owner: req.session.user._id})
        res.render('recipes/index.ejs', { recipes });
    } catch (error) {
        console.log(error)
        res.redirect("/")
    }
});

router.get("/new", async (req, res) => {
    const ingredients = await Ingredients.find({})
    res.render('recipes/new.ejs', { ingredients }) 
    // The const ingredients is being passed to locals object with the same key being attached.
    // In this case the key name and the variable  have the same name. Thus just the key name is the only thing needed
});

router.post("/", async (req, res) => {
    // const user = await User.findById(req.session.user._id)
try { 
    const recipeData = {
        ...req.body,
        owner: req.session.user._id,
    }
    const recipe = new Recipe(recipeData);
    await recipe.save();

    res.redirect("/recipes")
} 
catch (error) {
    console.log(error);
    res.redirect("/")
}
});

router.get("/:recipeId", async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.recipeId).populate("ingredients");
            if (recipe.owner.toString() === req.session.user._id) {
                res.render("recipes/show.ejs", { recipe })
            } else {
                res.redirect("/")
            }
    } catch(error) {
        console.log(error)
        res.redirect("/")
    }  
})

router.delete("/:recipeId", async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.recipeId);
      if (recipe.owner.toString() == req.session.user._id) {
        await Recipe.findByIdAndDelete(req.params.recipeId);
        res.redirect("/recipes");
      } else {
        res.redirect("/");
      }
    } catch (error) {
      console.log(error);
      res.redirect("/");
    }
});

router.get("/:recipeId", async (req, res) => {
    try{
        const recipe = await Recipe.findById(req.params.recipeId);
        if (recipe.owner.toString() == req.session.user._id) {
            await Recipe.findByIdAndUpdate(req.params.recipeId);
        res.redirect("/recipes");
        } else {
            res.redirect("/recipes")
        }
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
});

router.get("/:recipeId/edit", async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.recipeId);
      if (recipe.owner.toString() == req.session.user._id) {
        res.render("recipes/edit.ejs", { recipe });
      } else {
        res.redirect("/");
      }
    } catch (error) {
      console.log(error);
      res.redirect("/");
    }
});

router.put("/:recipeId", async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.recipeId);
      if (recipe.owner.toString() == req.session.user._id) {
        await Recipe.findByIdAndUpdate(req.params.recipeId, req.body);
        res.redirect(`/recipes/${req.params.recipeId}`);
      } else {
        res.redirect("/");
      }
    } catch (error) {
      console.log(error);
      res.redirect("/");
    }
});

module.exports = router;
