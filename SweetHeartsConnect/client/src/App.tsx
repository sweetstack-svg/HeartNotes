import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { FloatingHearts } from "@/components/floating-hearts";
import { Sidebar } from "@/components/sidebar";
import { useState } from "react";

// Pages
import Home from "@/pages/home";
import Reminders from "@/pages/reminders";
import Tasks from "@/pages/tasks";
import Hugs from "@/pages/hugs";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/reminders" component={Reminders} />
      <Route path="/tasks" component={Tasks} />
      <Route path="/hugs" component={Hugs} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen relative flex">
      <FloatingHearts />
      
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content */}
      <div className="flex-1 relative z-10 lg:ml-64">
        <div className="w-full flex justify-center px-4 py-6">
          <div className="w-full max-w-4xl">
            <Router />
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <AppLayout />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
