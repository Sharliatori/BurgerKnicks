import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import HeroSection from "./HeroSection";
import BurgerCustomizer from "./BurgerCustomizer";
import MenuDuoSelector from "./MenuDuoSelector";
import CheckoutSection from "./CheckoutSection";
import OrderConfirmation from "./OrderConfirmation";

interface Ingredient {
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

const Home = () => {
  // Application state
  const [currentStep, setCurrentStep] = useState<
    "hero" | "customize" | "checkout" | "confirmation"
  >("hero");
  const [isMenuDuoEnabled, setIsMenuDuoEnabled] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    [],
  );
  const [selectedSides, setSelectedSides] = useState<SideItem[]>([]);
  const [orderDetails, setOrderDetails] = useState({
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
  });

  // Refs for scrolling
  const customizerRef = useRef<HTMLDivElement>(null);

  // Handlers
  const handleScrollToCustomizer = () => {
    setCurrentStep("customize");
    customizerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleMenuDuoToggle = (enabled: boolean) => {
    setIsMenuDuoEnabled(enabled);
  };

  const handleProceedToCheckout = () => {
    // In a real app, we would calculate these values based on actual selections
    const subtotal = 19.22; // Example value
    const tax = subtotal * 0.0875; // 8.75% tax rate
    const total = subtotal + tax;

    setOrderDetails({
      ...orderDetails,
      subtotal,
      tax,
      total,
    });

    setCurrentStep("checkout");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToCustomization = () => {
    setCurrentStep("customize");
    customizerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePaymentComplete = (success: boolean) => {
    if (success) {
      setCurrentStep("confirmation");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleStartNewOrder = () => {
    setCurrentStep("customize");
    setSelectedIngredients([]);
    setSelectedSides([]);
    setIsMenuDuoEnabled(false);
    customizerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleGoHome = () => {
    setCurrentStep("hero");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Always visible */}
      {currentStep === "hero" && (
        <HeroSection onScrollToCustomizer={handleScrollToCustomizer} />
      )}

      {/* Burger Customization Section */}
      {(currentStep === "customize" || currentStep === "hero") && (
        <div
          ref={customizerRef}
          className="py-16 px-4 md:px-8 max-w-7xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <BurgerCustomizer onCheckout={handleProceedToCheckout} />
          </motion.div>

          {/* Menu Duo Selector - Conditionally rendered based on toggle */}
          {isMenuDuoEnabled && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <MenuDuoSelector
                isVisible={isMenuDuoEnabled}
                onSelectionChange={setSelectedSides}
              />
            </motion.div>
          )}
        </div>
      )}

      {/* Checkout Section */}
      {currentStep === "checkout" && (
        <div className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
          <CheckoutSection
            orderDetails={orderDetails}
            onBackToCustomization={handleBackToCustomization}
            onPaymentComplete={handlePaymentComplete}
          />
        </div>
      )}

      {/* Order Confirmation */}
      {currentStep === "confirmation" && (
        <div className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
          <OrderConfirmation
            orderNumber={`NYC-${Math.floor(Math.random() * 10000)}`}
            customerName="John Doe"
            estimatedDeliveryTime="15-20 minutes"
            orderItems={[
              {
                name: orderDetails.burgerName,
                quantity: 1,
                price: orderDetails.ingredients.reduce(
                  (sum, item) => sum + item.price,
                  0,
                ),
              },
              ...orderDetails.sides.map((side) => ({
                name: side.name,
                quantity: 1,
                price: side.price,
              })),
            ]}
            totalAmount={orderDetails.total}
            onStartNewOrder={handleStartNewOrder}
            onGoHome={handleGoHome}
          />
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">NYC Burger Co.</h3>
            <p className="text-gray-400">
              Crafting the perfect New York-inspired burgers since 2023.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Hours</h3>
            <p className="text-gray-400">Monday - Friday: 11am - 10pm</p>
            <p className="text-gray-400">Saturday - Sunday: 12pm - 11pm</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-gray-400">123 Madison Ave, New York, NY 10001</p>
            <p className="text-gray-400">info@nycburgerco.com</p>
            <p className="text-gray-400">(212) 555-1234</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
          <p>
            © {new Date().getFullYear()} NYC Burger Co. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
