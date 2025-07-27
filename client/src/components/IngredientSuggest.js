import React, { useState } from 'react';
import axios from 'axios';

const IngredientSuggest = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [matchAll, setMatchAll] = useState(true);

  const handleSearch = async () => {
    console.log("🟢 Suggest Recipes button clicked!");
    const ingredientsArray = ingredients
      .split(',')
      .map(i => i.trim().toLowerCase())
      .filter(Boolean); // Remove empty strings

    if (ingredientsArray.length === 0) {
      alert('⚠️ Please enter at least one ingredient.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:8000/recipes/suggest', {
        params: {
          ingredients: ingredientsArray,
          match_type: matchAll ? 'all' : 'any',
        },
      });

      setRecipes(response.data.suggested_recipes);
    } catch (error) {
      console.error('❌ Error fetching recipes:', error);
      alert('❌ Failed to fetch recipes. Please try again later.');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-green-700">📖 Recipe Book</h2>
      <h3 className="text-lg font-semibold">🍅 Suggest Recipes by Ingredients</h3>

      <input
        type="text"
        placeholder="Enter ingredients (e.g., tomato, onion)"
        className="border p-2 w-full rounded"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />

      <div className="flex items-center mt-2">
        <input
          type="checkbox"
          checked={matchAll}
          onChange={() => setMatchAll(!matchAll)}
          className="mr-2"
        />
        <label>Match all ingredients</label>
      </div>

      <button
        onClick={handleSearch}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-2"
      >
        Suggest Recipes
      </button>

      {recipes.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold text-lg">🍽 Matching Recipes:</h4>
          <ul className="list-disc pl-5">
            {recipes.map((recipe) => (
              <li key={recipe._id} className="mb-2">
                <strong>{recipe.title}</strong><br />
                <span className="text-sm text-gray-600">
                  {recipe.ingredients.join(', ')}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IngredientSuggest;
