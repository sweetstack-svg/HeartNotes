import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Bell, Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Reminder } from "@shared/schema";

export default function Reminders() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReminder, setNewReminder] = useState({ title: "", description: "" });
  const { toast } = useToast();

  const { data: reminders = [], isLoading } = useQuery<Reminder[]>({
    queryKey: ["/api/reminders"],
  });

  const createReminderMutation = useMutation({
    mutationFn: async (data: { title: string; description: string }) => {
      return await apiRequest("POST", "/api/reminders", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reminders"] });
      setNewReminder({ title: "", description: "" });
      setShowAddForm(false);
      toast({
        title: "Reminder Created",
        description: "Your gentle reminder has been added!",
      });
    },
  });



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReminder.title.trim()) return;
    createReminderMutation.mutate(newReminder);
  };



  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-pink-600 dark:text-pink-400 mb-2" style={{ fontFamily: "cursive" }}>
          Gentle Reminders
        </h1>
        <p className="text-gray-600 dark:text-pink-300 text-lg">
          Sweet thoughts to nurture your relationship
        </p>
      </motion.div>

      

      {/* Reminders List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <Card key={i} className="glass-effect dark:glass-effect-dark">
                <CardContent className="p-4">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : reminders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Bell className="h-16 w-16 text-pink-300 dark:text-pink-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 dark:text-pink-300 mb-2">
              No reminders yet
            </h3>
            <p className="text-gray-500 dark:text-pink-400">
              Create your first gentle reminder to nurture your relationship
            </p>
          </motion.div>
        ) : (
          reminders.map((reminder, index) => (
            <motion.div
              key={reminder.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`glass-effect dark:glass-effect-dark shadow-xl ${
                reminder.isCompleted ? "opacity-75" : ""
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 dark:text-pink-200">
                        {reminder.title}
                      </h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

