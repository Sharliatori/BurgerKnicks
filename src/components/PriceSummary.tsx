import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { DollarSign, ShoppingCart } from "lucide-react";

interface PriceSummaryProps {
  basePrice?: number;
  toppingsPrice?: number;
  menuDuoPrice?: number;
  isMenuDuoEnabled?: boolean;
  onMenuDuoToggle?: (enabled: boolean) => void;
  onCheckout?: () => void;
}

const PriceSummary = ({
  basePrice = 8.99,
  toppingsPrice = 3.5,
  menuDuoPrice = 4.99,
  isMenuDuoEnabled = false,
  onMenuDuoToggle = () => {},
  onCheckout = () => {},
}: PriceSummaryProps) => {
  const [menuDuo, setMenuDuo] = useState(isMenuDuoEnabled);

  const handleMenuDuoToggle = (checked: boolean) => {
    setMenuDuo(checked);
    onMenuDuoToggle(checked);
  };

  const calculateTotal = () => {
    let total = basePrice + toppingsPrice;
    if (menuDuo) {
      total += menuDuoPrice;
    }
    return total.toFixed(2);
  };

  return (
    <Card className="w-full max-w-[350px] bg-white">
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-bold">
          <DollarSign className="mr-2 h-5 w-5" />
          Price Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Base Burger</span>
            <span className="font-medium">${basePrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Toppings</span>
            <span className="font-medium">${toppingsPrice.toFixed(2)}</span>
          </div>
          {menuDuo && (
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">
                Menu Duo (Sides/Drinks)
              </span>
              <span className="font-medium">${menuDuoPrice.toFixed(2)}</span>
            </div>
          )}
          <div className="mt-4 flex items-center justify-between border-t pt-2">
            <div className="flex items-center">
              <span className="mr-2 text-sm font-medium">Add Menu Duo</span>
              <Switch
                checked={menuDuo}
                onCheckedChange={handleMenuDuoToggle}
                className="data-[state=checked]:bg-orange-500"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between border-t border-dashed pt-2">
          <span className="text-lg font-bold">Total</span>
          <span className="text-lg font-bold">${calculateTotal()}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={onCheckout}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Proceed to Checkout
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PriceSummary;
