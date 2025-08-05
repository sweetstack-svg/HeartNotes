import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Heart, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import type { LoveMessage } from "@shared/schema";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  // Fetch today's love message
  const { data: todaysMessage, isLoading: messageLoading } = useQuery<LoveMessage>({
    queryKey: ["/api/love-messages/today"],
  });

  // Calculate countdown to next day
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const diff = tomorrow.getTime() - now.getTime();
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeLeft({ hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-pink-600 dark:text-pink-400 mb-2" style={{ fontFamily: "cursive" }}>
          Welcome Home, Sweetheart
        </h1>
        <p className="text-gray-600 dark:text-pink-300">
          Your daily dose of love awaits
        </p>
      </motion.div>

      {/* Daily Love Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="glass-effect dark:glass-effect-dark shadow-xl">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Heart className="h-8 w-8 text-pink-500 fill-current" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Today's Love Message
                </h2>
                <Heart className="h-8 w-8 text-pink-500 fill-current" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-8 rounded-xl text-white text-center mb-6 relative overflow-hidden">
              {/* Background hearts */}
              <div className="absolute inset-0 opacity-10">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-6xl"
                    style={{
                      left: `${20 + (i % 3) * 30}%`,
                      top: `${20 + Math.floor(i / 3) * 40}%`,
                    }}
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                  >
                    💕
                  </motion.div>
                ))}
              </div>
              
              {messageLoading ? (
                <div className="h-32 bg-white/20 rounded animate-pulse relative z-10" />
              ) : (
                <motion.p 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-2xl leading-relaxed font-semibold text-white relative z-10" 
                  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
                >
                  {todaysMessage?.message || "Love is in the air! 💕"}
                </motion.p>
              )}
            </div>

            {/* Floating love emojis */}
            <div className="flex justify-center space-x-4 mb-6">
              {["💖", "✨", "🌟", "💝", "🦋"].map((emoji, index) => (
                <motion.span
                  key={index}
                  className="text-3xl"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2 + index * 0.5,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Countdown to Next Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="glass-effect dark:glass-effect-dark shadow-xl">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Clock className="h-6 w-6 text-pink-500" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-pink-200">
                  Next Love Message In
                </h3>
              </div>
              
              <div className="flex justify-center space-x-4">
                {[
                  { label: "Hours", value: timeLeft.hours },
                  { label: "Minutes", value: timeLeft.minutes },
                  { label: "Seconds", value: timeLeft.seconds }
                ].map((time, index) => (
                  <motion.div
                    key={time.label}
                    className="text-center"
                    animate={{
                      scale: time.label === "Seconds" ? [1, 1.1, 1] : 1
                    }}
                    transition={{
                      duration: 1,
                      repeat: time.label === "Seconds" ? Infinity : 0,
                    }}
                  >
                    <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl p-4 min-w-[80px]">
                      <div className="text-2xl font-bold">
                        {time.value.toString().padStart(2, '0')}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-pink-300 mt-2 font-medium">
                      {time.label}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <p className="text-pink-600 dark:text-pink-400 mt-4 font-medium">
                Every moment until then, you're loved 💕
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}