import { Link, useLocation } from "wouter";
import { Home, Bell, Heart, HandHeart, MessageCircle, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./theme-provider";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SidebarNavigation({ isOpen, onClose }: SidebarNavigationProps) {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navigationItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/reminders", icon: Bell, label: "Reminders" },
    { href: "/tasks", icon: Heart, label: "Love Tasks" },
    { href: "/hugs", icon: HandHeart, label: "Virtual Hugs" },
    { href: "/complaints", icon: MessageCircle, label: "Complaints" },
  ];

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 h-full w-64 glass-effect dark:glass-effect-dark z-50 p-6"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-pink-600 dark:text-pink-400" style={{ fontFamily: "cursive" }}>
            SweetHearts
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-600 dark:text-pink-300 hover:text-pink-600 dark:hover:text-pink-400"
          >
            ×
          </Button>
        </div>

        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start space-x-3 ${
                    isActive 
                      ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg" 
                      : "hover:bg-pink-100 dark:hover:bg-pink-800 text-gray-700 dark:text-pink-200"
                  }`}
                  onClick={onClose}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 pt-8 border-t border-pink-200 dark:border-pink-700">
          <Button
            variant="ghost"
            className="w-full justify-start space-x-3 hover:bg-pink-100 dark:hover:bg-pink-800 text-gray-700 dark:text-pink-200"
            onClick={toggleTheme}
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
          </Button>
        </div>
      </motion.div>
    </>
  );
}
