import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface FallingEmojisProps {
  count?: number;
}

const FallingEmojis: React.FC<FallingEmojisProps> = ({ count = 10 }) => {
  const [emojis, setEmojis] = useState<
    Array<{ id: number; emoji: string; x: number; delay: number }>
  >([]);

  // Available emojis for the animation
  const availableEmojis = [
    "🍔",
    "🗽",
    "🏀",
    "🍅",
    "🧀",
    "🌶️",
    "🧅",
    "🥤",
    "🎤",
    "🥬",
    "🍩",
  ];

  useEffect(() => {
    // Generate random emojis with positions
    const newEmojis = Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji:
        availableEmojis[Math.floor(Math.random() * availableEmojis.length)],
      x: Math.random() * 100, // Random horizontal position (0-100%)
      delay: Math.random() * 5, // Random delay for animation start
    }));
    setEmojis(newEmojis);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {emojis.map((item) => (
        <motion.div
          key={item.id}
          className="absolute text-2xl opacity-20"
          style={{ left: `${item.x}%` }}
          initial={{ y: -50, opacity: 0 }}
          animate={{
            y: "110vh",
            opacity: [0, 0.5, 0.2],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            delay: item.delay,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default FallingEmojis;
