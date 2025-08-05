import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertReminderSchema,
  insertLoveTaskSchema,
  insertVirtualHugSchema,
  insertComplaintSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Love Messages routes
  app.get("/api/love-messages", async (req, res) => {
    try {
      const messages = await storage.getLoveMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch love messages" });
    }
  });

  app.get("/api/love-messages/today", async (req, res) => {
    try {
      const message = await storage.getTodaysLoveMessage();
      res.json(message);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch today's love message" });
    }
  });

  // Reminders routes
  app.get("/api/reminders", async (req, res) => {
    try {
      const reminders = await storage.getReminders();
      res.json(reminders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reminders" });
    }
  });

  app.post("/api/reminders", async (req, res) => {
    try {
      const validatedData = insertReminderSchema.parse(req.body);
      const reminder = await storage.createReminder(validatedData);
      res.status(201).json(reminder);
    } catch (error) {
      res.status(400).json({ message: "Invalid reminder data" });
    }
  });

  app.patch("/api/reminders/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const reminder = await storage.updateReminder(id, req.body);
      if (!reminder) {
        res.status(404).json({ message: "Reminder not found" });
        return;
      }
      res.json(reminder);
    } catch (error) {
      res.status(500).json({ message: "Failed to update reminder" });
    }
  });

  app.delete("/api/reminders/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteReminder(id);
      if (!deleted) {
        res.status(404).json({ message: "Reminder not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete reminder" });
    }
  });

  // Love Tasks routes
  app.get("/api/love-tasks", async (req, res) => {
    try {
      const tasks = await storage.getLoveTasks();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch love tasks" });
    }
  });

  app.post("/api/love-tasks", async (req, res) => {
    try {
      const validatedData = insertLoveTaskSchema.parse(req.body);
      const task = await storage.createLoveTask(validatedData);
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ message: "Invalid task data" });
    }
  });

  app.patch("/api/love-tasks/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const task = await storage.updateLoveTask(id, req.body);
      if (!task) {
        res.status(404).json({ message: "Task not found" });
        return;
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: "Failed to update task" });
    }
  });

  app.delete("/api/love-tasks/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteLoveTask(id);
      if (!deleted) {
        res.status(404).json({ message: "Task not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete task" });
    }
  });

  // Virtual Hugs routes
  app.get("/api/virtual-hugs", async (req, res) => {
    try {
      const hugs = await storage.getVirtualHugs();
      res.json(hugs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch virtual hugs" });
    }
  });

  app.post("/api/virtual-hugs", async (req, res) => {
    try {
      const validatedData = insertVirtualHugSchema.parse(req.body);
      const hug = await storage.sendVirtualHug(validatedData);
      res.status(201).json(hug);
    } catch (error) {
      res.status(400).json({ message: "Invalid hug data" });
    }
  });

  // Complaints routes
  app.get("/api/complaints", async (req, res) => {
    try {
      const complaints = await storage.getComplaints();
      res.json(complaints);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch complaints" });
    }
  });

  app.post("/api/complaints", async (req, res) => {
    try {
      const validatedData = insertComplaintSchema.parse(req.body);
      const complaint = await storage.createComplaint(validatedData);
      res.status(201).json(complaint);
    } catch (error) {
      res.status(400).json({ message: "Invalid complaint data" });
    }
  });

  app.patch("/api/complaints/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const complaint = await storage.updateComplaint(id, req.body);
      if (!complaint) {
        res.status(404).json({ message: "Complaint not found" });
        return;
      }
      res.json(complaint);
    } catch (error) {
      res.status(500).json({ message: "Failed to update complaint" });
    }
  });

  app.delete("/api/complaints/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteComplaint(id);
      if (!deleted) {
        res.status(404).json({ message: "Complaint not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete complaint" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
