const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
  name: { type: String, required: true},
  instructions: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  ingredients: [  ]
});

const Recipe = mongoose.model('Recipes', recipeSchema);

module.exports = Recipe;
