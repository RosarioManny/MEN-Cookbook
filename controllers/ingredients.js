const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');
const Ingredient = require('../models/ingredient.js');

router.get("/", async (req,res) => {
    try {
        const ingredients = await Ingredient.find([])
        res.render("ingredients/index.ejs", { ingredients })
    } catch(error) {
        console.log(error)
        res.redirect("/")
    }
})

router.post("/", async (req,res) => {
    try{

    } catch(error) {
        console.log(error)
        res.redirect('/')
    }
})

module.exports = router;
