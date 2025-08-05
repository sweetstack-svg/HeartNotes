import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const hugTypes = [
  { id: 'warm', emoji: '🫂', name: 'Warm Hug', color: 'from-orange-400 to-red-500' },
  { id: 'loving', emoji: '💕', name: 'Loving Hug', color: 'from-pink-400 to-purple-500' },
  { id: 'gentle', emoji: '🤗', name: 'Gentle Hug', color: 'from-blue-400 to-teal-500' },
  { id: 'tight', emoji: '🫶', name: 'Tight Hug', color: 'from-green-400 to-emerald-500' },
  { id: 'comfort', emoji: '💖', name: 'Comfort Hug', color: 'from-purple-400 to-indigo-500' },
  { id: 'playful', emoji: '🥰', name: 'Playful Hug', color: 'from-yellow-400 to-orange-500' },
];

export default function Hugs() {
  const [animationElements, setAnimationElements] = useState<Array<{ id: string; x: number; y: number; emoji: string; delay: number; animationType: string }>>([]);
  const [showBackgroundEffect, setShowBackgroundEffect] = useState(false);

  const triggerHugAnimation = (hugType: typeof hugTypes[0]) => {
    // Create multiple waves of animations for spectacular effect
    const hugEmojis = [hugType.emoji, '💕', '💖', '✨', '🌟', '💝', '🎉', '🌈', '💫', '🦋'];
    
    // First wave - center explosion (reduced from 15 to 8)
    const centerElements = Array.from({ length: 8 }, (_, i) => ({
      id: `center-${Date.now()}-${i}`,
      x: 45 + Math.random() * 10, // Center area
      y: 45 + Math.random() * 10,
      emoji: hugEmojis[Math.floor(Math.random() * hugEmojis.length)],
      delay: Math.random() * 0.5,
      animationType: 'center'
    }));

    // Second wave - spiraling effect (reduced from 20 to 10)
    const spiralElements = Array.from({ length: 10 }, (_, i) => {
      const angle = (i / 10) * 2 * Math.PI;
      const radius = 30 + Math.random() * 20;
      return {
        id: `spiral-${Date.now()}-${i}`,
        x: 50 + Math.cos(angle) * radius,
        y: 50 + Math.sin(angle) * radius,
        emoji: hugEmojis[Math.floor(Math.random() * hugEmojis.length)],
        delay: 0.5 + (i * 0.1),
        animationType: 'spiral'
      };
    });

    // Third wave - corners to center (reduced from 12 to 4)
    const cornerElements = Array.from({ length: 4 }, (_, i) => ({
      id: `corner-${Date.now()}-${i}`,
      x: i < 1 ? 5 : i < 2 ? 95 : i < 3 ? 5 : 95,
      y: i < 1 ? 5 : i < 2 ? 5 : i < 3 ? 95 : 95,
      emoji: hugEmojis[Math.floor(Math.random() * hugEmojis.length)],
      delay: 1 + Math.random() * 0.5,
      animationType: 'corner'
    }));

    // Fourth wave - falling from top (reduced from 15 to 3)
    const fallingElements = Array.from({ length: 3 }, (_, i) => ({
      id: `falling-${Date.now()}-${i}`,
      x: 20 + (i * 30), // More spaced out
      y: -10,
      emoji: hugEmojis[Math.floor(Math.random() * hugEmojis.length)],
      delay: 1.5 + (i * 0.3),
      animationType: 'falling'
    }));

    const allElements = [...centerElements, ...spiralElements, ...cornerElements, ...fallingElements];
    setAnimationElements(allElements);
    setShowBackgroundEffect(true);
    
    // Clean up animation after 4 seconds (reduced for better performance)
    setTimeout(() => {
      setAnimationElements([]);
      setShowBackgroundEffect(false);
    }, 4000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 relative">
      {/* Background Effect During Animation */}
      <AnimatePresence>
        {showBackgroundEffect && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, rgba(236, 72, 153, 0.1), rgba(168, 85, 247, 0.1), transparent 70%)'
            }}
          >
            {/* Pulsing color waves */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  'radial-gradient(circle at 20% 30%, rgba(236, 72, 153, 0.2), transparent 50%)',
                  'radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.2), transparent 50%)',
                  'radial-gradient(circle at 50% 20%, rgba(236, 72, 153, 0.2), transparent 50%)',
                  'radial-gradient(circle at 30% 80%, rgba(168, 85, 247, 0.2), transparent 50%)',
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-Screen Animation Overlay */}
      <AnimatePresence>
        {animationElements.map((element) => {
          // Different animation patterns based on type
          let animationConfig = {};
          
          switch (element.animationType) {
            case 'center':
              animationConfig = {
                initial: { opacity: 0, scale: 0 },
                animate: { 
                  opacity: [0, 1, 1, 0], 
                  scale: [0, 2, 1.5, 0],
                  rotate: [0, 360, 720],
                  x: [-50, 50, -30, 20, 0],
                  y: [-50, 30, -20, 40, 0]
                },
                transition: { duration: 4, delay: element.delay, ease: "easeOut" }
              };
              break;
            case 'spiral':
              animationConfig = {
                initial: { opacity: 0, scale: 0, rotate: 0 },
                animate: { 
                  opacity: [0, 1, 1, 0], 
                  scale: [0, 1.5, 1, 0],
                  rotate: [0, 720, 1080],
                  x: [0, Math.cos(element.delay * 10) * 100],
                  y: [0, Math.sin(element.delay * 10) * 100]
                },
                transition: { duration: 5, delay: element.delay, ease: "easeInOut" }
              };
              break;
            case 'corner':
              animationConfig = {
                initial: { opacity: 0, scale: 0 },
                animate: { 
                  opacity: [0, 1, 1, 0], 
                  scale: [0, 1.8, 1.2, 0],
                  x: [0, (50 - element.x) * 0.8, (50 - element.x) * 0.4, 0],
                  y: [0, (50 - element.y) * 0.8, (50 - element.y) * 0.4, 0],
                  rotate: [0, 180, 360]
                },
                transition: { duration: 3.5, delay: element.delay, ease: "easeOut" }
              };
              break;
            case 'falling':
              animationConfig = {
                initial: { opacity: 0, scale: 0, y: -100 },
                animate: { 
                  opacity: [0, 1, 1, 0], 
                  scale: [0, 1.3, 1, 0.8],
                  y: [0, window.innerHeight + 100],
                  rotate: [0, 180, 360],
                  x: [0, Math.sin(element.delay * 5) * 50]
                },
                transition: { duration: 4, delay: element.delay, ease: "easeIn" }
              };
              break;
            default:
              animationConfig = {
                initial: { opacity: 0, scale: 0 },
                animate: { 
                  opacity: [0, 1, 1, 0], 
                  scale: [0, 1.5, 1, 0],
                  rotate: [0, 360]
                },
                transition: { duration: 3, delay: element.delay, ease: "easeOut" }
              };
          }

          return (
            <motion.div
              key={element.id}
              {...animationConfig}
              className="fixed text-5xl pointer-events-none z-50 drop-shadow-lg"
              style={{
                left: `${element.x}%`,
                top: `${element.y}%`,
                filter: 'drop-shadow(0 0 10px rgba(236, 72, 153, 0.5))',
              }}
            >
              {element.emoji}
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-pink-600 dark:text-pink-400 mb-2" style={{ fontFamily: "cursive" }}>
          Virtual Hugs
        </h1>
        <p className="text-gray-600 dark:text-pink-300 text-lg">
          Choose a hug to send warm love
        </p>
      </motion.div>

      {/* Hug Type Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 gap-4"
      >
        {hugTypes.map((hugType, index) => (
          <motion.div
            key={hugType.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              onClick={() => triggerHugAnimation(hugType)}
              className={`w-full h-24 flex flex-col items-center justify-center space-y-2 bg-gradient-to-r ${hugType.color} text-white border-none hover:scale-110 active:scale-95 transform transition-all duration-300 shadow-lg glass-effect relative overflow-hidden group`}
            >
              {/* Pulsing background effect */}
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 group-active:opacity-30 transition-opacity duration-300 rounded-lg"></div>
              
              {/* Animated emoji */}
              <motion.span 
                className="text-3xl relative z-10"
                whileHover={{ 
                  scale: 1.2, 
                  rotate: [0, -10, 10, 0],
                }}
                whileTap={{ scale: 1.5, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                {hugType.emoji}
              </motion.span>
              
              {/* Button text */}
              <span className="text-sm font-medium relative z-10">{hugType.name}</span>
              
              {/* Sparkle effect on hover */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-yellow-300 text-lg"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${10 + (i % 2) * 30}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      rotate: [0, 180],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  >
                    ✨
                  </motion.div>
                ))}
              </motion.div>
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}