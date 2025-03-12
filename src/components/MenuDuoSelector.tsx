import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { Pizza, Coffee, Utensils } from "lucide-react";

interface SideItem {
  id: string;
  name: string;
  price: number;
  image: string;
  type: "side" | "drink";
}

interface MenuDuoSelectorProps {
  isVisible?: boolean;
  onSelectionChange?: (selectedItems: SideItem[]) => void;
}

const MenuDuoSelector = ({
  isVisible = true,
  onSelectionChange = () => {},
}: MenuDuoSelectorProps) => {
  const [selectedSides, setSelectedSides] = useState<string[]>([]);
  const [selectedDrinks, setSelectedDrinks] = useState<string[]>([]);

  // Sample sides and drinks data
  const sides: SideItem[] = [
    {
      id: "fries",
      name: "French Fries",
      price: 3.99,
      image:
        "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=300&q=80",
      type: "side",
    },
    {
      id: "onion-rings",
      name: "Onion Rings",
      price: 4.49,
      image:
        "https://images.unsplash.com/photo-1639024471283-03518883512d?w=300&q=80",
      type: "side",
    },
    {
      id: "salad",
      name: "Side Salad",
      price: 3.49,
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&q=80",
      type: "side",
    },
  ];

  const drinks: SideItem[] = [
    {
      id: "soda",
      name: "Fountain Soda",
      price: 2.49,
      image:
        "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&q=80",
      type: "drink",
    },
    {
      id: "shake",
      name: "Milkshake",
      price: 4.99,
      image:
        "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=300&q=80",
      type: "drink",
    },
    {
      id: "water",
      name: "Bottled Water",
      price: 1.99,
      image:
        "https://images.unsplash.com/photo-1616118132534-381148898bb4?w=300&q=80",
      type: "drink",
    },
  ];

  const toggleSideSelection = (id: string) => {
    setSelectedSides((prev) => {
      const newSelection = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];

      updateSelections(newSelection, selectedDrinks);
      return newSelection;
    });
  };

  const toggleDrinkSelection = (id: string) => {
    setSelectedDrinks((prev) => {
      const newSelection = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];

      updateSelections(selectedSides, newSelection);
      return newSelection;
    });
  };

  const updateSelections = (sideIds: string[], drinkIds: string[]) => {
    const selectedItems = [
      ...sides.filter((side) => sideIds.includes(side.id)),
      ...drinks.filter((drink) => drinkIds.includes(drink.id)),
    ];
    onSelectionChange(selectedItems);
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full bg-orange-50 rounded-lg p-6 shadow-md"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-orange-800 flex items-center">
          <Utensils className="mr-2 h-5 w-5" />
          Menu Duo Selection
        </h2>
        <Badge
          variant="outline"
          className="bg-orange-100 text-orange-800 border-orange-300 px-3 py-1"
        >
          Complete Your Meal
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sides Section */}
        <Card className="bg-white border-orange-200">
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <Pizza className="h-5 w-5 text-orange-600 mr-2" />
              <h3 className="text-lg font-semibold">Choose a Side</h3>
            </div>
            <div className="space-y-4">
              {sides.map((side) => (
                <div
                  key={side.id}
                  className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${selectedSides.includes(side.id) ? "bg-orange-100 border border-orange-300" : "bg-gray-50 hover:bg-gray-100 border border-gray-200"}`}
                  onClick={() => toggleSideSelection(side.id)}
                >
                  <div className="w-16 h-16 rounded-md overflow-hidden mr-4">
                    <img
                      src={side.image}
                      alt={side.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{side.name}</h4>
                    <p className="text-sm text-gray-600">
                      ${side.price.toFixed(2)}
                    </p>
                  </div>
                  <Switch
                    checked={selectedSides.includes(side.id)}
                    onCheckedChange={() => toggleSideSelection(side.id)}
                    className="data-[state=checked]:bg-orange-500"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Drinks Section */}
        <Card className="bg-white border-orange-200">
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <Coffee className="h-5 w-5 text-orange-600 mr-2" />
              <h3 className="text-lg font-semibold">Choose a Drink</h3>
            </div>
            <div className="space-y-4">
              {drinks.map((drink) => (
                <div
                  key={drink.id}
                  className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${selectedDrinks.includes(drink.id) ? "bg-orange-100 border border-orange-300" : "bg-gray-50 hover:bg-gray-100 border border-gray-200"}`}
                  onClick={() => toggleDrinkSelection(drink.id)}
                >
                  <div className="w-16 h-16 rounded-md overflow-hidden mr-4">
                    <img
                      src={drink.image}
                      alt={drink.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{drink.name}</h4>
                    <p className="text-sm text-gray-600">
                      ${drink.price.toFixed(2)}
                    </p>
                  </div>
                  <Switch
                    checked={selectedDrinks.includes(drink.id)}
                    onCheckedChange={() => toggleDrinkSelection(drink.id)}
                    className="data-[state=checked]:bg-orange-500"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex justify-end">
        <Button
          variant="outline"
          className="text-orange-600 border-orange-600 hover:bg-orange-50 mr-2"
          onClick={() => {
            setSelectedSides([]);
            setSelectedDrinks([]);
            updateSelections([], []);
          }}
        >
          Clear Selection
        </Button>
        <Button
          className="bg-orange-500 hover:bg-orange-600 text-white"
          onClick={() => console.log("Selections confirmed")}
        >
          Confirm Selections
        </Button>
      </div>
    </motion.div>
  );
};

export default MenuDuoSelector;
