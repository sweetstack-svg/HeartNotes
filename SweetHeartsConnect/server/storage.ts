import { randomUUID } from "crypto";
import {
  type LoveMessage,
  type InsertLoveMessage,
  type Reminder,
  type InsertReminder,
  type LoveTask,
  type InsertLoveTask,
  type VirtualHug,
  type InsertVirtualHug,
  type Complaint,
  type InsertComplaint,
} from "@shared/schema";

export interface IStorage {
  getLoveMessages(): Promise<LoveMessage[]>;
  getTodaysLoveMessage(): Promise<LoveMessage | undefined>;
  createLoveMessage(message: InsertLoveMessage): Promise<LoveMessage>;

  getReminders(): Promise<Reminder[]>;
  createReminder(reminder: InsertReminder): Promise<Reminder>;
  updateReminder(id: string, updates: Partial<Reminder>): Promise<Reminder | undefined>;
  deleteReminder(id: string): Promise<boolean>;

  getLoveTasks(): Promise<LoveTask[]>;
  createLoveTask(task: InsertLoveTask): Promise<LoveTask>;
  updateLoveTask(id: string, updates: Partial<LoveTask>): Promise<LoveTask | undefined>;
  deleteLoveTask(id: string): Promise<boolean>;

  getVirtualHugs(): Promise<VirtualHug[]>;
  sendVirtualHug(hug: InsertVirtualHug): Promise<VirtualHug>;

  getComplaints(): Promise<Complaint[]>;
  createComplaint(complaint: InsertComplaint): Promise<Complaint>;
  updateComplaint(id: string, updates: Partial<Complaint>): Promise<Complaint | undefined>;
  deleteComplaint(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private loveMessages = new Map<string, LoveMessage>();
  private reminders = new Map<string, Reminder>();
  private loveTasks = new Map<string, LoveTask>();
  private virtualHugs = new Map<string, VirtualHug>();
  private complaints = new Map<string, Complaint>();

  constructor() {
    this.initializeData();
  }

  private async initializeData() {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));

    // 🎯 SIMPLIFIED: Just add your messages as strings! No need for isActive field.
    const loveMessages = [
      "You're the sunshine that brightens even my darkest days. ☀️",
      "Every heartbeat of mine beats only for you. 💓",
      "No matter how far we are, you're always close to my heart. 🌍💖",
      "Just thinking about you makes my day instantly better. 🥰",
      "You're not my number one. You're my only one. 💘",
      // TODO: Add your remaining 360 love messages here!
      // "Your new love message here 💕",
      // "Another sweet message 💖",
      // ... just add strings, super easy!
    ];

    const todaysMessageIndex = dayOfYear % loveMessages.length;
    for (let i = 0; i < loveMessages.length; i++) {
      await this.createLoveMessage({ 
        message: loveMessages[i], 
        isActive: i === todaysMessageIndex 
      });
    }

    await this.initializeDailyReminders(dayOfYear);

    // 🎯 SIMPLIFIED: Just add task titles as strings! No need for order field.
    const allTasks = [
      "Say 'I love you' first thing",
      "Send a cute GIF 💌",
      "Plan a sweet message",
      "Recall a shared memory 📸",
      "Draw a doodle for them ✏️",
      // TODO: Add your 365 love tasks here!
      // "Your new task here",
      // "Another task",
      // ... just add strings, super easy!
    ];

    const todayTaskIndexes = [0, 1, 2].map(i => (dayOfYear + i) % allTasks.length);
    for (let i = 0; i < todayTaskIndexes.length; i++) {
      const taskIndex = todayTaskIndexes[i];
      await this.createLoveTask({ 
        title: allTasks[taskIndex], 
        order: i + 1,
        isCompleted: false 
      });
    }
  }

  private async initializeDailyReminders(dayOfYear: number) {
    // 🎯 SIMPLIFIED: Just add reminder titles as strings! No need for objects.
    const allReminders = [
      "Drink water! 💧",
      "Send a sweet text 💌",
      "Smile at your reflection 😊",
      "Hug someone today 🫂",
      "Stretch and breathe 🌬️",
      "Write a gratitude note ✍️",
      // TODO: Add your 365 reminders here!
      // "Your new reminder here",
      // "Another reminder",
      // ... just add strings, super easy!
    ];

    const indexes = [0, 1, 2].map(i => (dayOfYear + i) % allReminders.length);
    for (const i of indexes) {
      await this.createReminder({ 
        title: allReminders[i],
        isCompleted: false 
      });
    }
  }

  async getLoveMessages(): Promise<LoveMessage[]> {
    return Array.from(this.loveMessages.values()).sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getTodaysLoveMessage(): Promise<LoveMessage | undefined> {
    return Array.from(this.loveMessages.values()).find(msg => msg.isActive);
  }

  async createLoveMessage(insertMessage: InsertLoveMessage): Promise<LoveMessage> {
    const id = randomUUID();
    const message: LoveMessage = {
      ...insertMessage,
      id,
      createdAt: new Date(),
      imageUrl: insertMessage.imageUrl ?? null,
      isActive: insertMessage.isActive ?? true,
    };
    this.loveMessages.set(id, message);
    return message;
  }

  async getReminders(): Promise<Reminder[]> {
    return Array.from(this.reminders.values()).sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async createReminder(insertReminder: InsertReminder): Promise<Reminder> {
    const id = randomUUID();
    const reminder: Reminder = {
      ...insertReminder,
      id,
      createdAt: new Date(),
      description: insertReminder.description ?? null,
      isCompleted: insertReminder.isCompleted ?? false,
    };
    this.reminders.set(id, reminder);
    return reminder;
  }

  async updateReminder(id: string, updates: Partial<Reminder>): Promise<Reminder | undefined> {
    const reminder = this.reminders.get(id);
    if (!reminder) return undefined;
    const updatedReminder = { ...reminder, ...updates };
    this.reminders.set(id, updatedReminder);
    return updatedReminder;
  }

  async deleteReminder(id: string): Promise<boolean> {
    return this.reminders.delete(id);
  }

  async getLoveTasks(): Promise<LoveTask[]> {
    return Array.from(this.loveTasks.values()).sort((a, b) => a.order - b.order);
  }

  async createLoveTask(insertTask: InsertLoveTask): Promise<LoveTask> {
    const id = randomUUID();
    const task: LoveTask = {
      ...insertTask,
      id,
      createdAt: new Date(),
      description: insertTask.description ?? null,
      isCompleted: insertTask.isCompleted ?? false,
      order: insertTask.order ?? 0,
    };
    this.loveTasks.set(id, task);
    return task;
  }

  async updateLoveTask(id: string, updates: Partial<LoveTask>): Promise<LoveTask | undefined> {
    const task = this.loveTasks.get(id);
    if (!task) return undefined;
    const updatedTask = { ...task, ...updates };
    this.loveTasks.set(id, updatedTask);
    return updatedTask;
  }

  async deleteLoveTask(id: string): Promise<boolean> {
    return this.loveTasks.delete(id);
  }

  async getVirtualHugs(): Promise<VirtualHug[]> {
    return Array.from(this.virtualHugs.values()).sort((a, b) => new Date(b.sentAt!).getTime() - new Date(a.sentAt!).getTime());
  }

  async sendVirtualHug(insertHug: InsertVirtualHug): Promise<VirtualHug> {
    const id = randomUUID();
    const hug: VirtualHug = {
      ...insertHug,
      id,
      sentAt: new Date(),
      message: insertHug.message ?? null,
      hugType: insertHug.hugType ?? "warm",
    };
    this.virtualHugs.set(id, hug);
    return hug;
  }

  async getComplaints(): Promise<Complaint[]> {
    return Array.from(this.complaints.values()).sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async createComplaint(insertComplaint: InsertComplaint): Promise<Complaint> {
    const id = randomUUID();
    const complaint: Complaint = {
      ...insertComplaint,
      id,
      createdAt: new Date(),
      status: insertComplaint.status ?? "open",
    };
    this.complaints.set(id, complaint);
    return complaint;
  }

  async updateComplaint(id: string, updates: Partial<Complaint>): Promise<Complaint | undefined> {
    const complaint = this.complaints.get(id);
    if (!complaint) return undefined;
    const updatedComplaint = { ...complaint, ...updates };
    this.complaints.set(id, updatedComplaint);
    return updatedComplaint;
  }

  async deleteComplaint(id: string): Promise<boolean> {
    return this.complaints.delete(id);
  }
}

export const storage = new MemStorage();

