import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowDown } from "lucide-react";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  videoUrl?: string;
  onScrollToCustomizer?: () => void;
}

const HeroSection = ({
  title = "Build Your Perfect NYC Burger",
  subtitle = "Drag, drop, and customize your dream burger with our interactive builder",
  videoUrl = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&q=80",
  onScrollToCustomizer = () => console.log("Scroll to customizer clicked"),
}: HeroSectionProps) => {
  return (
    <div className="relative h-screen w-full bg-black overflow-hidden">
      {/* Video Background with Fallback Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={videoUrl}
          alt="Delicious burger"
          className="w-full h-full object-cover opacity-70"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80">
        {/* Knicks-inspired color accents */}
        <div
          className="absolute top-0 left-0 w-full h-2"
          style={{ backgroundColor: "hsl(var(--knicks-blue))" }}
        ></div>
        <div
          className="absolute bottom-0 left-0 w-full h-2"
          style={{ backgroundColor: "hsl(var(--knicks-orange))" }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 md:px-8 max-w-6xl mx-auto">
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#006BB6] mb-6 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {title}
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-[#BEC0C2] mb-12 max-w-3xl drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            onClick={onScrollToCustomizer}
            className="bg-accent hover:bg-accent/90 text-white px-8 py-6 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105"
          >
            Start Building
            <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>

      {/* Animated scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
        }}
      >
        <ArrowDown className="h-8 w-8 text-white opacity-80" />
      </motion.div>
    </div>
  );
};

export default HeroSection;
