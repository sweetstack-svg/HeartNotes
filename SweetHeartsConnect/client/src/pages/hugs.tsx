import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

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
  const [hugCount, setHugCount] = useState(0);

  // Initialize hug count and check for daily reset
  useEffect(() => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('hugCountDate');
    const storedCount = localStorage.getItem('hugCount');
    
    if (storedDate === today && storedCount) {
      // Same day, load existing count
      setHugCount(parseInt(storedCount, 10));
    } else {
      // New day or first time, reset count
      setHugCount(0);
      localStorage.setItem('hugCountDate', today);
      localStorage.setItem('hugCount', '0');
    }
  }, []);

  // Save hug count to localStorage whenever it changes
  useEffect(() => {
    if (hugCount > 0) {
      localStorage.setItem('hugCount', hugCount.toString());
    }
  }, [hugCount]);

  const triggerHugAnimation = (hugType: typeof hugTypes[0]) => {
    // Create a lively but smooth animation with more elements
    const hugEmojis = [hugType.emoji, '💕', '💖', '✨', '🌟', '💝'];
    
    // Center burst with more elements
    const centerElements = Array.from({ length: 8 }, (_, i) => ({
      id: `center-${Date.now()}-${i}`,
      x: 45 + Math.random() * 10,
      y: 45 + Math.random() * 10,
      emoji: hugEmojis[Math.floor(Math.random() * hugEmojis.length)],
      delay: Math.random() * 0.4,
      animationType: 'center'
    }));

    // Floating hearts from corners
    const floatingElements = Array.from({ length: 6 }, (_, i) => {
      const positions = [
        { x: 10, y: 10 }, { x: 90, y: 10 }, { x: 10, y: 90 },
        { x: 90, y: 90 }, { x: 50, y: 10 }, { x: 50, y: 90 }
      ];
      return {
        id: `floating-${Date.now()}-${i}`,
        x: positions[i].x,
        y: positions[i].y,
        emoji: hugEmojis[Math.floor(Math.random() * hugEmojis.length)],
        delay: 0.5 + (i * 0.15),
        animationType: 'floating'
      };
    });

    // Add gentle side elements for more coverage
    const sideElements = Array.from({ length: 4 }, (_, i) => {
      const positions = [
        { x: 5, y: 50 }, { x: 95, y: 50 },
        { x: 25, y: 25 }, { x: 75, y: 75 }
      ];
      return {
        id: `side-${Date.now()}-${i}`,
        x: positions[i].x,
        y: positions[i].y,
        emoji: hugEmojis[Math.floor(Math.random() * hugEmojis.length)],
        delay: 0.8 + (i * 0.1),
        animationType: 'floating'
      };
    });

    const allElements = [...centerElements, ...floatingElements, ...sideElements];
    setAnimationElements(allElements);
    setShowBackgroundEffect(true);
    setHugCount(prev => prev + 1);
    
    // Clean up animation after 5 seconds
    setTimeout(() => {
      setAnimationElements([]);
      setShowBackgroundEffect(false);
    }, 5000);
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
                  scale: [0, 1.3, 1.1, 0],
                  rotate: [0, 180],
                  y: [0, -20, 0, 20]
                },
                transition: { duration: 2.5, delay: element.delay, ease: "easeOut" }
              };
              break;
            case 'floating':
              animationConfig = {
                initial: { opacity: 0, scale: 0 },
                animate: { 
                  opacity: [0, 1, 1, 0], 
                  scale: [0, 1.2, 1, 0],
                  x: [0, (50 - element.x) * 0.3],
                  y: [0, (50 - element.y) * 0.3],
                  rotate: [0, 90]
                },
                transition: { duration: 2.8, delay: element.delay, ease: "easeInOut" }
              };
              break;
            default:
              animationConfig = {
                initial: { opacity: 0, scale: 0 },
                animate: { 
                  opacity: [0, 1, 1, 0], 
                  scale: [0, 1.2, 1, 0],
                  rotate: [0, 180]
                },
                transition: { duration: 2.5, delay: element.delay, ease: "easeOut" }
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

      {/* Hug Count Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8"
      >
        <div className="glass-effect dark:glass-effect-dark shadow-xl rounded-2xl p-6 border border-pink-200 dark:border-pink-700">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-4xl"
              >
                🫂
              </motion.div>
              <h3 className="text-2xl font-bold text-pink-600 dark:text-pink-400" style={{ fontFamily: "cursive" }}>
                Hugs Sent
              </h3>
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="text-4xl"
              >
                💕
              </motion.div>
            </div>
            
            <div className="relative">
              <motion.div
                key={hugCount}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 15, stiffness: 300 }}
                className="text-6xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-2"
              >
                {hugCount}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gray-600 dark:text-pink-300 text-lg"
              >
                Hug Count
              </motion.div>
            </div>
            
            {/* Milestone celebrations */}
            {hugCount > 0 && hugCount % 5 === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="mt-4 flex items-center justify-center space-x-2"
              >
                <span className="text-2xl">🎉</span>
                <span className="text-sm font-medium text-pink-600 dark:text-pink-400">
                  Milestone reached!
                </span>
                <span className="text-2xl">🎉</span>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
