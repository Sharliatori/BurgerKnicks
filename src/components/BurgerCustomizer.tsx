import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import IngredientsList from "./IngredientsList";
import PriceSummary from "./PriceSummary";
import FallingEmojis from "./FallingEmojis";
import { DndContext } from "@dnd-kit/core";

interface Ingredient {
  id: string;
  name: string;
  price: number;
  image: string;
  type: "bun" | "patty" | "cheese" | "vegetable" | "sauce" | "extra";
  position: number;
}

interface BurgerCustomizerProps {
  onCheckout?: () => void;
}

const BurgerCustomizer = ({ onCheckout = () => {} }: BurgerCustomizerProps) => {
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    [],
  );
  const [isMenuDuoEnabled, setIsMenuDuoEnabled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [basePrice, setBasePrice] = useState(8.99);
  const [toppingsPrice, setToppingsPrice] = useState(0);
  const [menuDuoPrice, setMenuDuoPrice] = useState(4.99);

  // Update toppings price when ingredients change
  useEffect(() => {
    const newToppingsPrice = selectedIngredients.reduce(
      (total, ingredient) => total + (ingredient.price || 0),
      0,
    );
    setToppingsPrice(newToppingsPrice);
  }, [selectedIngredients]);

  const handleIngredientsChange = (ingredients: any[]) => {
    // Convert to the expected Ingredient type with position
    const formattedIngredients = ingredients.map((ing, index) => ({
      ...ing,
      type: ing.category as
        | "bun"
        | "patty"
        | "cheese"
        | "vegetable"
        | "sauce"
        | "extra",
      position: index,
    }));

    setSelectedIngredients(formattedIngredients);
  };

  const handleReset = () => {
    setSelectedIngredients([]);
    setIsAnimating(false);
  };

  const handleMenuDuoToggle = (enabled: boolean) => {
    setIsMenuDuoEnabled(enabled);
  };

  const handleCheckout = () => {
    onCheckout();
  };

  const handleDragStart = () => {
    setIsAnimating(true);
  };

  const handleDragEnd = () => {
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="relative bg-gradient-to-b from-secondary/30 to-white p-6 md:p-10 rounded-xl shadow-lg w-full overflow-hidden">
        {/* Animated Falling Emojis Background */}
        <FallingEmojis count={15} />

        <div className="relative z-10">
          {" "}
          {/* Content wrapper with higher z-index */}
          <h1 className="text-3xl md:text-4xl font-bold text-accent text-center mb-8">
            Build Your Perfect NYC Burger
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Price Summary */}
            <div className="lg:col-span-1">
              <div className="mt-6">
                <PriceSummary
                  basePrice={basePrice}
                  toppingsPrice={toppingsPrice}
                  menuDuoPrice={menuDuoPrice}
                  isMenuDuoEnabled={isMenuDuoEnabled}
                  onMenuDuoToggle={handleMenuDuoToggle}
                  onCheckout={handleCheckout}
                />
              </div>
            </div>

            {/* Right Column - Ingredients Selection */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <IngredientsList
                  onIngredientsChange={handleIngredientsChange}
                  onReset={handleReset}
                />
              </motion.div>
            </div>
          </div>
          {/* Disclaimer */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              Prices are subject to change. Nutritional information available
              upon request.
            </p>
            <p>
              © {new Date().getFullYear()} NYC Burger Co. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </DndContext>
  );
};

export default BurgerCustomizer;
