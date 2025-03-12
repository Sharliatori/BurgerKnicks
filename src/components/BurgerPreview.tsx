import React, { useState } from "react";
import { motion } from "framer-motion";

interface Ingredient {
  id: string;
  name: string;
  image: string;
  type: "bun" | "patty" | "cheese" | "vegetable" | "sauce" | "extra";
  position: number;
}

interface BurgerPreviewProps {
  ingredients?: Ingredient[];
  isAnimating?: boolean;
}

const BurgerPreview = ({
  ingredients = [
    {
      id: "top-bun",
      name: "Top Bun",
      image: "/bun-top.png",
      type: "bun",
      position: 0,
    },
    {
      id: "lettuce",
      name: "Lettuce",
      image: "/lettuce.png",
      type: "vegetable",
      position: 1,
    },
    {
      id: "tomato",
      name: "Tomato",
      image: "/tomato.png",
      type: "vegetable",
      position: 2,
    },
    {
      id: "cheese",
      name: "Cheese",
      image: "/cheese.png",
      type: "cheese",
      position: 3,
    },
    {
      id: "patty",
      name: "Beef Patty",
      image: "/patty.png",
      type: "patty",
      position: 4,
    },
    {
      id: "bottom-bun",
      name: "Bottom Bun",
      image: "/bun-bottom.png",
      type: "bun",
      position: 5,
    },
  ],
  isAnimating = false,
}: BurgerPreviewProps) => {
  // Sort ingredients by position
  const sortedIngredients = [...ingredients].sort(
    (a, b) => a.position - b.position,
  );

  return (
    <div className="bg-secondary/20 p-8 rounded-lg shadow-lg w-full h-full flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold text-primary mb-6">
        Your Burger Preview
      </h2>

      <div className="relative w-80 h-80 mx-auto">
        {sortedIngredients.map((ingredient, index) => (
          <motion.div
            key={ingredient.id}
            className="absolute left-0 right-0 mx-auto w-64"
            style={{
              top: `${index * 20}px`,
              zIndex: sortedIngredients.length - index,
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: 1,
              y: 0,
              rotate: isAnimating ? [0, 5, -5, 0] : 0,
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              rotate: {
                repeat: isAnimating ? Infinity : 0,
                repeatType: "reverse",
                duration: 1,
              },
            }}
          >
            {/* Placeholder for ingredient images */}
            <div
              className={`w-full h-16 rounded-lg flex items-center justify-center
                ${ingredient.type === "bun" ? "bg-amber-300" : ""}
                ${ingredient.type === "patty" ? "bg-brown-600" : ""}
                ${ingredient.type === "cheese" ? "bg-yellow-300" : ""}
                ${ingredient.type === "vegetable" ? "bg-green-400" : ""}
                ${ingredient.type === "sauce" ? "bg-red-300" : ""}
                ${ingredient.type === "extra" ? "bg-gray-300" : ""}
              `}
            >
              <span className="text-center font-medium">{ingredient.name}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Drag and drop ingredients to customize your burger
        </p>
        <button
          className="mt-4 bg-accent hover:bg-accent/90 text-white font-bold py-2 px-4 rounded-full transition-colors"
          onClick={() => console.log("Burger preview interaction")}
        >
          Looks Delicious!
        </button>
      </div>
    </div>
  );
};

export default BurgerPreview;
