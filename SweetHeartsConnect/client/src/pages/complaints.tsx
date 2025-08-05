import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { MessageCircle, Plus, Clock, CheckCircle, AlertCircle, X } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Complaint } from "@shared/schema";

export default function Complaints() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newComplaint, setNewComplaint] = useState({ title: "", description: "" });
  const { toast } = useToast();

  const { data: complaints = [], isLoading } = useQuery<Complaint[]>({
    queryKey: ["/api/complaints"],
  });

  const createComplaintMutation = useMutation({
    mutationFn: async (data: { title: string; description: string }) => {
      return await apiRequest("POST", "/api/complaints", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/complaints"] });
      setNewComplaint({ title: "", description: "" });
      setShowAddForm(false);
      toast({
        title: "Feedback Submitted",
        description: "Thank you for helping us improve SweetHearts!",
      });
    },
  });

  const updateComplaintMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return await apiRequest("PATCH", `/api/complaints/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/complaints"] });
    },
  });

  const deleteComplaintMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/complaints/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/complaints"] });
      toast({
        title: "Feedback Deleted",
        description: "The feedback has been removed.",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComplaint.title.trim() || !newComplaint.description.trim()) return;
    createComplaintMutation.mutate(newComplaint);
  };

  const handleStatusChange = (id: string, status: string) => {
    updateComplaintMutation.mutate({ id, status });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <Clock className="h-4 w-4" />;
      case "in-progress":
        return <AlertCircle className="h-4 w-4" />;
      case "resolved":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">
          Feedback & Support
        </h1>
        <p className="text-gray-600 dark:text-pink-300">
          Help us make SweetHearts even better for you
        </p>
      </motion.div>

      {/* Add Complaint Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:scale-105 transform transition-all duration-200"
        >
          <Plus className="mr-2 h-4 w-4" />
          Submit Feedback
        </Button>
      </motion.div>

      {/* Add Complaint Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Card className="glass-effect dark:glass-effect-dark shadow-xl">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-pink-200 mb-2">
                    Issue Title
                  </label>
                  <Input
                    placeholder="Brief description of the issue..."
                    value={newComplaint.title}
                    onChange={(e) => setNewComplaint({ ...newComplaint, title: e.target.value })}
                    className="bg-white/50 dark:bg-gray-800/50"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-pink-200 mb-2">
                    Details
                  </label>
                  <Textarea
                    placeholder="Please provide more details about the issue or suggestion..."
                    value={newComplaint.description}
                    onChange={(e) => setNewComplaint({ ...newComplaint, description: e.target.value })}
                    className="bg-white/50 dark:bg-gray-800/50 min-h-[100px]"
                    required
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    type="submit" 
                    disabled={createComplaintMutation.isPending}
                    className="flex-1 bg-pink-500 hover:bg-pink-600"
                  >
                    Submit Feedback
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowAddForm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Complaints List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <Card key={i} className="glass-effect dark:glass-effect-dark">
                <CardContent className="p-4">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : complaints.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <MessageCircle className="h-16 w-16 text-pink-300 dark:text-pink-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 dark:text-pink-300 mb-2">
              No feedback yet
            </h3>
            <p className="text-gray-500 dark:text-pink-400">
              We'd love to hear your thoughts on how to improve SweetHearts
            </p>
          </motion.div>
        ) : (
          complaints.map((complaint, index) => (
            <motion.div
              key={complaint.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-effect dark:glass-effect-dark shadow-xl">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-800 dark:text-pink-200">
                          {complaint.title}
                        </h3>
                        <Badge className={`${getStatusColor(complaint.status)} flex items-center space-x-1`}>
                          {getStatusIcon(complaint.status)}
                          <span className="capitalize">{complaint.status.replace('-', ' ')}</span>
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-pink-300 mb-2">
                        {complaint.description}
                      </p>
                      
                      <p className="text-xs text-gray-500 dark:text-pink-400">
                        Submitted on {formatDate(complaint.createdAt!)}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <Select
                        value={complaint.status}
                        onValueChange={(status) => handleStatusChange(complaint.id, status)}
                      >
                        <SelectTrigger className="w-32 h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteComplaintMutation.mutate(complaint.id)}
                        className="h-8 w-8 text-gray-400 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Support Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="glass-effect dark:glass-effect-dark shadow-xl">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-pink-200 mb-4 text-center">
              💝 We Value Your Feedback 💝
            </h3>
            
            <div className="text-center space-y-2">
              <p className="text-gray-600 dark:text-pink-300">
                Your feedback helps us create a better experience for all couples.
              </p>
              <p className="text-sm text-gray-500 dark:text-pink-400">
                We review all submissions and aim to respond within 24-48 hours.
              </p>
            </div>
            
            <div className="mt-4 p-4 bg-pink-50 dark:bg-pink-900/30 rounded-xl">
              <p className="text-sm text-pink-700 dark:text-pink-300 text-center">
                💡 <strong>Tip:</strong> Include as much detail as possible to help us understand and resolve your concern quickly.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
