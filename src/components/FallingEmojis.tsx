import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface EmojiProps {
  emoji: string;
  x: number;
  y: number;
  rotation: number;
  size: number;
  duration: number;
  delay: number;
}

interface FallingEmojisProps {
  count?: number;
}

const FallingEmojis = ({ count = 20 }: FallingEmojisProps) => {
  const [emojis, setEmojis] = useState<EmojiProps[]>([]);

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
  ];

  useEffect(() => {
    const newEmojis: EmojiProps[] = [];

    for (let i = 0; i < count; i++) {
      newEmojis.push({
        emoji:
          availableEmojis[Math.floor(Math.random() * availableEmojis.length)],
        x: Math.random() * 100, // random x position (0-100%)
        y: -20 - Math.random() * 100, // start above the viewport
        rotation: Math.random() * 360,
        size: 16 + Math.random() * 24, // random size between 16-40px
        duration: 10 + Math.random() * 20, // random duration between 10-30s
        delay: Math.random() * 30, // random delay for staggered start
      });
    }

    setEmojis(newEmojis);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {emojis.map((emoji, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{
            x: `${emoji.x}vw`,
            y: `${emoji.y}vh`,
            rotate: emoji.rotation,
          }}
          animate={{
            y: "120vh",
            rotate: emoji.rotation + 360 * Math.floor(2 + Math.random() * 3),
          }}
          transition={{
            duration: emoji.duration,
            delay: emoji.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            fontSize: `${emoji.size}px`,
            opacity: 0.7,
          }}
        >
          {emoji.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default FallingEmojis;
