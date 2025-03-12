import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Plus, Minus, Trash2, RefreshCw, PlusCircle } from "lucide-react";

interface Burger {
  id: string;
  pattyCount: number;
  hasOnions: boolean;
  hasJalapenos: boolean;
  price: number;
}

interface IngredientsListProps {
  onIngredientsChange?: (ingredients: any[]) => void;
  onReset?: () => void;
}

const IngredientsList = ({
  onIngredientsChange = () => {},
  onReset = () => {},
}: IngredientsListProps) => {
  const [burgers, setBurgers] = useState<Burger[]>([]);
  const [nextId, setNextId] = useState(1);

  // Base prices
  const BASE_PRICE = 8.99;
  const PATTY_PRICE = 4.5;
  const ONIONS_PRICE = 0.5;
  const JALAPENOS_PRICE = 0.75;

  // Update parent component when burgers change
  useEffect(() => {
    // Convert burgers to the format expected by the parent component
    const ingredients = burgers.flatMap((burger) => {
      const burgerIngredients = [
        {
          id: `bun-${burger.id}`,
          name: "Sesame Bun",
          price: BASE_PRICE - PATTY_PRICE, // Base price minus one patty
          category: "base",
        },
      ];

      // Add patties
      for (let i = 0; i < burger.pattyCount; i++) {
        burgerIngredients.push({
          id: `patty-${burger.id}-${i}`,
          name: "Beef Patty",
          price: PATTY_PRICE,
          category: "protein",
        });
      }

      // Add onions if selected
      if (burger.hasOnions) {
        burgerIngredients.push({
          id: `onions-${burger.id}`,
          name: "Onions",
          price: ONIONS_PRICE,
          category: "topping",
        });
      }

      // Add jalapeños if selected
      if (burger.hasJalapenos) {
        burgerIngredients.push({
          id: `jalapenos-${burger.id}`,
          name: "Jalapeños",
          price: JALAPENOS_PRICE,
          category: "topping",
        });
      }

      return burgerIngredients;
    });

    onIngredientsChange(ingredients);
  }, [burgers, onIngredientsChange]);

  const calculateBurgerPrice = (burger: Burger): number => {
    let price = BASE_PRICE;
    price += (burger.pattyCount - 1) * PATTY_PRICE; // First patty included in base price
    if (burger.hasOnions) price += ONIONS_PRICE;
    if (burger.hasJalapenos) price += JALAPENOS_PRICE;
    return price;
  };

  const addBurger = () => {
    const newBurger: Burger = {
      id: `burger-${nextId}`,
      pattyCount: 1,
      hasOnions: false,
      hasJalapenos: false,
      price: BASE_PRICE,
    };
    setBurgers([...burgers, newBurger]);
    setNextId(nextId + 1);
  };

  const removeBurger = (id: string) => {
    setBurgers(burgers.filter((burger) => burger.id !== id));
  };

  const updateBurger = (id: string, updates: Partial<Burger>) => {
    setBurgers(
      burgers.map((burger) => {
        if (burger.id === id) {
          const updatedBurger = { ...burger, ...updates };
          updatedBurger.price = calculateBurgerPrice(updatedBurger);
          return updatedBurger;
        }
        return burger;
      }),
    );
  };

  const incrementPatty = (id: string) => {
    const burger = burgers.find((b) => b.id === id);
    if (burger && burger.pattyCount < 3) {
      updateBurger(id, { pattyCount: burger.pattyCount + 1 });
    }
  };

  const decrementPatty = (id: string) => {
    const burger = burgers.find((b) => b.id === id);
    if (burger && burger.pattyCount > 1) {
      updateBurger(id, { pattyCount: burger.pattyCount - 1 });
    }
  };

  const toggleOnions = (id: string, checked: boolean) => {
    updateBurger(id, { hasOnions: checked });
  };

  const toggleJalapenos = (id: string, checked: boolean) => {
    updateBurger(id, { hasJalapenos: checked });
  };

  const handleReset = () => {
    setBurgers([]);
    setNextId(1);
    onReset();
  };

  const calculateTotalPrice = () => {
    return burgers
      .reduce((total, burger) => total + burger.price, 0)
      .toFixed(2);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-orange-600">
          Customize Your Burgers
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex items-center gap-2 text-orange-600 border-orange-600 hover:bg-orange-50"
          >
            <RefreshCw size={16} />
            Reset All
          </Button>
          <Button
            onClick={addBurger}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white"
          >
            <PlusCircle size={16} />
            Add Burger
          </Button>
        </div>
      </div>

      {burgers.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          <p className="text-gray-500 mb-4">No burgers added yet</p>
          <Button
            onClick={addBurger}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Your First Burger
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {burgers.map((burger, index) => (
            <Card key={burger.id} className="border-orange-200">
              <CardHeader className="flex flex-row items-center justify-between bg-orange-50 pb-2">
                <CardTitle className="text-xl font-bold text-orange-800">
                  Burger #{index + 1}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeBurger(burger.id)}
                  className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 size={18} />
                </Button>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Patty Count */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Beef Patties</Label>
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => decrementPatty(burger.id)}
                        disabled={burger.pattyCount <= 1}
                        className="h-8 w-8"
                      >
                        <Minus size={16} />
                      </Button>
                      <div className="w-12 text-center font-bold">
                        {burger.pattyCount}
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => incrementPatty(burger.id)}
                        disabled={burger.pattyCount >= 3}
                        className="h-8 w-8"
                      >
                        <Plus size={16} />
                      </Button>
                      <span className="ml-2 text-sm text-gray-500">
                        ${PATTY_PRICE.toFixed(2)} each
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-end">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="text-xl font-bold text-orange-600">
                        ${burger.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Toppings */}
                  <div className="col-span-1 md:col-span-2">
                    <Label className="text-sm font-medium mb-2 block">
                      Toppings
                    </Label>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`onions-${burger.id}`}
                          checked={burger.hasOnions}
                          onCheckedChange={(checked) =>
                            toggleOnions(burger.id, checked as boolean)
                          }
                        />
                        <Label
                          htmlFor={`onions-${burger.id}`}
                          className="text-sm font-medium"
                        >
                          Onions (+${ONIONS_PRICE.toFixed(2)})
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`jalapenos-${burger.id}`}
                          checked={burger.hasJalapenos}
                          onCheckedChange={(checked) =>
                            toggleJalapenos(burger.id, checked as boolean)
                          }
                        />
                        <Label
                          htmlFor={`jalapenos-${burger.id}`}
                          className="text-sm font-medium"
                        >
                          Jalapeños (+${JALAPENOS_PRICE.toFixed(2)})
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Order Summary */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Order Summary</h3>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  Total ({burgers.length} burgers)
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  ${calculateTotalPrice()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IngredientsList;
