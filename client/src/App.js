import React from "react";
import IngredientSuggest from "./components/IngredientSuggest";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">🥗 Recipe Book</h1>
      <IngredientSuggest />
    </div>
  );
}

export default App;
