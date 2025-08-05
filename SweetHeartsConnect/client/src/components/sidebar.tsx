import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Home, Bell, CheckSquare, Heart, Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

const navigationItems = [
  {
    name: "Home",
    href: "/",
    icon: Home,
    emoji: "🏠"
  },
  {
    name: "Reminders",
    href: "/reminders",
    icon: Bell,
    emoji: "💕"
  },
  {
    name: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
    emoji: "✨"
  },
  {
    name: "Hugs",
    href: "/hugs",
    icon: Heart,
    emoji: "🫂"
  }
];

export function Sidebar({ isOpen, onClose, onToggle }: SidebarProps) {
  const [location] = useLocation();

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <>
      {/* Menu toggle button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 text-gray-600 dark:text-pink-300 hover:text-pink-600 dark:hover:text-pink-400"
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : -320
        }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 glass-effect dark:glass-effect-dark border-r border-pink-200 dark:border-pink-700",
          "lg:translate-x-0 lg:static lg:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-pink-200 dark:border-pink-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white fill-current" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-pink-600 dark:text-pink-400" style={{ fontFamily: "cursive" }}>
                    SweetHearts
                  </h1>
                  <p className="text-xs text-pink-500 dark:text-pink-400">
                    {getCurrentDate()}
                  </p>
                </div>
              </div>
              
              {/* Close button for mobile */}
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="lg:hidden text-gray-600 dark:text-pink-300 hover:text-pink-600 dark:hover:text-pink-400"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => {
              const isActive = location === item.href;
              const Icon = item.icon;
              
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    onClick={onClose}
                    className={cn(
                      "w-full justify-start space-x-3 h-12 text-left transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg hover:shadow-xl"
                        : "text-gray-700 dark:text-pink-300 hover:bg-pink-50 dark:hover:bg-pink-900/30 hover:text-pink-600 dark:hover:text-pink-400"
                    )}
                  >
                    <span className="text-xl">{item.emoji}</span>
                    <span className="font-medium">{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute right-2 w-2 h-2 bg-white rounded-full"
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                      />
                    )}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-pink-200 dark:border-pink-700">
            <div className="text-center">
              <p className="text-xs text-pink-500 dark:text-pink-400 mb-2">
                Made with 💕 for you
              </p>
              <div className="flex justify-center space-x-1">
                {["💕", "✨", "💖"].map((emoji, index) => (
                  <motion.span
                    key={index}
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                    className="text-sm"
                  >
                    {emoji}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
