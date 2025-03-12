import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Home, RefreshCw } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface OrderConfirmationProps {
  orderNumber?: string;
  customerName?: string;
  estimatedDeliveryTime?: string;
  orderItems?: {
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount?: number;
  onStartNewOrder?: () => void;
  onGoHome?: () => void;
}

const OrderConfirmation = ({
  orderNumber = "NYC-1234",
  customerName = "John Doe",
  estimatedDeliveryTime = "30-40 minutes",
  orderItems = [
    { name: "Custom NYC Burger", quantity: 1, price: 12.99 },
    { name: "French Fries", quantity: 1, price: 3.99 },
    { name: "Soda", quantity: 1, price: 2.49 },
  ],
  totalAmount = 19.47,
  onStartNewOrder = () => console.log("Start new order clicked"),
  onGoHome = () => console.log("Go home clicked"),
}: OrderConfirmationProps) => {
  const [isAnimating, setIsAnimating] = useState(true);

  // Calculate subtotal
  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  // Assume tax is 8%
  const tax = subtotal * 0.08;

  return (
    <div className="bg-orange-50 min-h-[500px] w-full flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-2 border-green-500 shadow-lg">
          <CardHeader className="bg-green-500 text-white text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Check className="h-10 w-10 text-green-500" />
            </motion.div>
            <CardTitle className="text-2xl font-bold">
              Order Confirmed!
            </CardTitle>
            <p className="text-green-100 mt-2">Thank you for your order</p>
          </CardHeader>

          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Order Number
                </h3>
                <p className="font-bold">{orderNumber}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Customer</h3>
                <p className="font-bold">{customerName}</p>
              </div>
              <div className="col-span-2">
                <h3 className="text-sm font-medium text-gray-500">
                  Estimated Delivery Time
                </h3>
                <p className="font-bold text-orange-600">
                  {estimatedDeliveryTime}
                </p>
              </div>
            </div>

            <div className="border-t border-dashed border-gray-200 pt-4">
              <h3 className="font-semibold mb-3">Order Summary</h3>
              <ul className="space-y-2">
                {orderItems.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex justify-between"
                  >
                    <span>
                      {item.quantity} x {item.name}
                    </span>
                    <span className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-3">
            <Button
              onClick={onStartNewOrder}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Start New Order
            </Button>
            <Button
              variant="outline"
              onClick={onGoHome}
              className="w-full border-orange-500 text-orange-500 hover:bg-orange-50"
            >
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;
