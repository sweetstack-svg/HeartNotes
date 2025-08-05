import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FloatingHeart {
  id: string;
  emoji: string;
  x: number;
  y: number;
  delay: number;
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    const heartEmojis = ['💖', '💕', '💝', '💗', '💓', '💘'];
    
    // Initialize hearts
    const initialHearts: FloatingHeart[] = Array.from({ length: 6 }, (_, i) => ({
      id: `heart-${i}`,
      emoji: heartEmojis[i],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 6,
    }));

    setHearts(initialHearts);

    // Add new hearts periodically
    const interval = setInterval(() => {
      const newHeart: FloatingHeart = {
        id: `heart-${Date.now()}`,
        emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: 0,
      };

      setHearts(prev => [...prev, newHeart]);

      // Remove heart after animation
      setTimeout(() => {
        setHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
      }, 12000);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-2xl opacity-60"
            style={{
              left: `${heart.x}%`,
              top: `${heart.y}%`,
              color: 'var(--romantic-pink)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 0.6, 
              scale: 1,
              y: [-20, 0, -20],
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: 6,
              delay: heart.delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            {heart.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
