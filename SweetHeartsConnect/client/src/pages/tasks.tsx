import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Heart, CheckCircle, Circle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { LoveTask } from "@shared/schema";

export default function Tasks() {
  const { toast } = useToast();

  const { data: tasks = [], isLoading } = useQuery<LoveTask[]>({
    queryKey: ["/api/love-tasks"],
  });



  const updateTaskMutation = useMutation({
    mutationFn: async ({ id, isCompleted }: { id: string; isCompleted: boolean }) => {
      return await apiRequest("PATCH", `/api/love-tasks/${id}`, { isCompleted });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/love-tasks"] });
    },
  });



  const completedTasks = tasks.filter(task => task.isCompleted).length;
  const totalTasks = tasks.length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;



  const handleToggleComplete = (id: string, isCompleted: boolean) => {
    updateTaskMutation.mutate({ id, isCompleted: !isCompleted });
    
    if (!isCompleted) {
      // Celebrate completion
      toast({
        title: "Love Task Completed! 💕",
        description: "You're making your relationship stronger!",
      });
    }
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
          Love Tasks
        </h1>
        <p className="text-gray-600 dark:text-pink-300 text-lg">
          Small actions that make a big difference
        </p>
      </motion.div>

      {/* Progress Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="glass-effect dark:glass-effect-dark shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-pink-200">
                Progress
              </h3>
              <span className="text-sm bg-pink-500 text-white px-3 py-1 rounded-full">
                {completedTasks}/{totalTasks} Complete
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tasks List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <Card key={i} className="glass-effect dark:glass-effect-dark">
                <CardContent className="p-4">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : tasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Heart className="h-16 w-16 text-pink-300 dark:text-pink-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 dark:text-pink-300 mb-2">
              No love tasks yet
            </h3>
            <p className="text-gray-500 dark:text-pink-400">
              Create your first love task to start spreading joy
            </p>
          </motion.div>
        ) : (
          tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`glass-effect dark:glass-effect-dark shadow-xl ${
                task.isCompleted ? "border-green-200 dark:border-green-800" : ""
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleToggleComplete(task.id, task.isCompleted)}
                      className={`mt-1 ${
                        task.isCompleted 
                          ? "text-green-500 hover:text-green-600" 
                          : "text-gray-400 hover:text-pink-500"
                      }`}
                    >
                      {task.isCompleted ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : (
                        <Circle className="h-6 w-6" />
                      )}
                    </Button>
                    
                    <div className="flex-1">
                      <h3 className={`font-semibold text-gray-800 dark:text-pink-200 ${
                        task.isCompleted ? "line-through text-green-600 dark:text-green-400" : ""
                      }`}>
                        {task.title}
                      </h3>
                      {task.isCompleted && (
                        <span className="inline-flex items-center text-xs text-green-600 dark:text-green-400 mt-2">
                          <Heart className="h-3 w-3 mr-1" />
                          Completed with love!
                        </span>
                      )}
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
