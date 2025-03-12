import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { Button } from "../components/ui/button";
import { Check, X } from "lucide-react";

interface IngredientItem {
  id: string;
  name: string;
  price: number;
  category: "base" | "protein" | "cheese" | "veggies" | "sauce";
}

interface SideItem {
  id: string;
  name: string;
  price: number;
  type: "side" | "drink";
}

interface OrderSummaryProps {
  burgerName?: string;
  ingredients?: IngredientItem[];
  sides?: SideItem[];
  subtotal?: number;
  tax?: number;
  total?: number;
  onEdit?: () => void;
}

const OrderSummary = ({
  burgerName = "Custom NYC Burger",
  ingredients = [
    { id: "1", name: "Brioche Bun", price: 1.5, category: "base" },
    { id: "2", name: "Beef Patty", price: 4.99, category: "protein" },
    { id: "3", name: "Cheddar Cheese", price: 1.25, category: "cheese" },
    { id: "4", name: "Lettuce", price: 0.75, category: "veggies" },
    { id: "5", name: "Tomato", price: 0.75, category: "veggies" },
    { id: "6", name: "Special Sauce", price: 0.99, category: "sauce" },
  ],
  sides = [
    { id: "1", name: "French Fries", price: 3.99, type: "side" },
    { id: "2", name: "Soda", price: 2.49, type: "drink" },
  ],
  subtotal = 16.71,
  tax = 1.46,
  total = 18.17,
  onEdit = () => console.log("Edit order clicked"),
}: OrderSummaryProps) => {
  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold text-center">
          {burgerName}
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          onClick={onEdit}
        >
          Edit
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Burger Ingredients</h3>
            <ul className="space-y-2">
              {ingredients.map((ingredient) => (
                <li
                  key={ingredient.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span>{ingredient.name}</span>
                  </div>
                  <span className="text-gray-600">
                    ${ingredient.price.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {sides.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Menu Duo</h3>
              <ul className="space-y-2">
                {sides.map((side) => (
                  <li
                    key={side.id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <Check size={16} className="text-green-500 mr-2" />
                      <span>{side.name}</span>
                    </div>
                    <span className="text-gray-600">
                      ${side.price.toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Separator className="my-4" />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
