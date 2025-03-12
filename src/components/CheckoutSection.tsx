import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CreditCard } from "lucide-react";
import OrderSummary from "./OrderSummary";
import StripePaymentForm from "./StripePaymentForm";
import FallingEmojis from "./FallingEmojis";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface CheckoutSectionProps {
  orderDetails?: {
    burgerName: string;
    ingredients: Array<{
      id: string;
      name: string;
      price: number;
      category: "base" | "protein" | "cheese" | "veggies" | "sauce";
    }>;
    sides: Array<{
      id: string;
      name: string;
      price: number;
      type: "side" | "drink";
    }>;
    subtotal: number;
    tax: number;
    total: number;
  };
  onBackToCustomization?: () => void;
  onPaymentComplete?: (success: boolean) => void;
}

const CheckoutSection = ({
  orderDetails = {
    burgerName: "NYC Knicks Burger",
    ingredients: [
      { id: "1", name: "Brioche Bun", price: 2.5, category: "base" },
      { id: "2", name: "Beef Patty", price: 5.99, category: "protein" },
      { id: "3", name: "Cheddar Cheese", price: 1.5, category: "cheese" },
      { id: "4", name: "Lettuce", price: 0.75, category: "veggies" },
      { id: "5", name: "Tomato", price: 0.75, category: "veggies" },
      { id: "6", name: "Special Sauce", price: 1.25, category: "sauce" },
    ],
    sides: [
      { id: "1", name: "French Fries", price: 3.99, type: "side" },
      { id: "2", name: "Soda", price: 2.49, type: "drink" },
    ],
    subtotal: 19.22,
    tax: 1.68,
    total: 20.9,
  },
  onBackToCustomization = () => {},
  onPaymentComplete = () => {},
}: CheckoutSectionProps) => {
  const [currentStep, setCurrentStep] = useState<"review" | "payment">(
    "review",
  );
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleContinueToPayment = () => {
    setCurrentStep("payment");
  };

  const handleBackToReview = () => {
    setCurrentStep("review");
  };

  const handlePaymentComplete = (success: boolean) => {
    setPaymentSuccess(success);
    onPaymentComplete(success);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden">
      {/* Animated Falling Emojis Background */}
      <FallingEmojis count={20} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
          <h2 className="text-3xl font-bold">Checkout</h2>
          <p className="text-orange-100">Complete your order</p>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center">
              <div
                className={`rounded-full h-10 w-10 flex items-center justify-center ${currentStep === "review" ? "bg-orange-500 text-white" : "bg-orange-200 text-orange-700"}`}
              >
                1
              </div>
              <div className="text-sm font-medium ml-2">Review Order</div>
            </div>
            <div
              className={`h-1 w-16 mx-4 ${currentStep === "payment" || paymentSuccess ? "bg-orange-500" : "bg-gray-200"}`}
            ></div>
            <div className="flex items-center">
              <div
                className={`rounded-full h-10 w-10 flex items-center justify-center ${currentStep === "payment" ? "bg-orange-500 text-white" : paymentSuccess ? "bg-green-500 text-white" : "bg-orange-200 text-orange-700"}`}
              >
                {paymentSuccess ? "✓" : "2"}
              </div>
              <div className="text-sm font-medium ml-2">Payment</div>
            </div>
          </div>

          <Tabs value={currentStep} className="w-full">
            <TabsContent value="review" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                  <OrderSummary
                    burgerName={orderDetails.burgerName}
                    ingredients={orderDetails.ingredients}
                    sides={orderDetails.sides}
                    subtotal={orderDetails.subtotal}
                    tax={orderDetails.tax}
                    total={orderDetails.total}
                    onEdit={onBackToCustomization}
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">
                      Delivery Information
                    </h3>
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <p className="text-gray-700 mb-2">
                        Your order will be ready for pickup in:
                      </p>
                      <p className="text-2xl font-bold text-orange-600">
                        15-20 minutes
                      </p>
                      <p className="text-gray-500 mt-4">Pick up at:</p>
                      <p className="font-medium">NYC Burger Joint</p>
                      <p className="text-gray-600">
                        123 Madison Ave, New York, NY 10001
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-between">
                    <Button
                      variant="outline"
                      onClick={onBackToCustomization}
                      className="flex items-center gap-2"
                    >
                      <ArrowLeft size={16} />
                      Back to Customization
                    </Button>
                    <Button
                      onClick={handleContinueToPayment}
                      className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
                    >
                      Continue to Payment
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="payment" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
                  <StripePaymentForm
                    amount={orderDetails.total}
                    onPaymentComplete={handlePaymentComplete}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Subtotal:</span>
                      <span>${orderDetails.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Tax:</span>
                      <span>${orderDetails.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <span>Total:</span>
                      <span>${orderDetails.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <Button
                      variant="outline"
                      onClick={handleBackToReview}
                      className="flex items-center gap-2"
                    >
                      <ArrowLeft size={16} />
                      Back to Review
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </div>
  );
};

export default CheckoutSection;
