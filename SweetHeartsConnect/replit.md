# Overview

SweetHearts is a simplified personal love message application designed for single-person home use. The app focuses primarily on displaying daily love messages with virtual hug animations as the core feature. It has been streamlined from a comprehensive relationship management tool to a PWA-ready personal app with a beautiful pink glassmorphism design and floating heart animations.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom romantic theme colors (pink, purple, rose)
- **Animations**: Framer Motion for smooth transitions and floating heart effects
- **Build Tool**: Vite for development and production builds

## Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with standardized JSON responses
- **Error Handling**: Centralized error middleware with proper HTTP status codes
- **Request Processing**: Built-in JSON and URL-encoded body parsing
- **Development**: Hot-reload with Vite integration in development mode

## Data Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL with Neon serverless database
- **Schema Management**: Code-first approach with migrations in `./migrations`
- **Validation**: Zod schemas for runtime type validation
- **Storage Pattern**: Repository pattern with in-memory fallback storage

## Database Schema
The application has been simplified to focus on core entities:
- **Love Messages**: Daily romantic messages (images removed for simplicity)
- **Virtual Hugs**: Direct hug animation triggers without message storage
- **Removed Features**: Reminders, love tasks, and complaints sections have been removed for simplified single-person use

## Authentication & Sessions
- **Session Management**: PostgreSQL-backed sessions using connect-pg-simple
- **Session Storage**: Persistent sessions stored in database
- **Security**: CORS handling and secure session configuration

## Theme System
- **Theme Provider**: React Context-based dark/light mode switching
- **CSS Variables**: Dynamic theming with CSS custom properties
- **Local Storage**: Theme preference persistence
- **Romantic Design**: Custom color palette with glass morphism effects

## Navigation & Routing
- **Left Sidebar Navigation**: Fixed sidebar on desktop with collapsible mobile drawer
- **Proper Routing**: Each section has its own route (/, /reminders, /tasks, /hugs)
- **Active State Highlighting**: Current page highlighted in sidebar navigation
- **Dedicated Pages**: Home shows only love messages with countdown timer, other sections are separate pages
- **Mobile Hamburger Menu**: Toggle sidebar on mobile devices

## Mobile Responsiveness & PWA
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Touch Interface**: Optimized for mobile interactions with sidebar navigation
- **Progressive Web App**: Full PWA support with manifest.json, service worker, and offline capabilities for all routes
- **Install to Home Screen**: Users can install the app directly to their device home screen
- **App-like Experience**: Standalone display mode with theme colors and proper icon support

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Drizzle Kit**: Database migration and schema management tools

## UI Component Libraries
- **Radix UI**: Headless, accessible component primitives for all interactive elements
- **shadcn/ui**: Pre-styled component system built on Radix UI
- **Lucide React**: Icon library for consistent iconography

## Development Tools
- **Vite**: Fast build tool with hot module replacement
- **TypeScript**: Static type checking and enhanced developer experience
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind CSS integration

## Runtime Libraries
- **TanStack Query**: Server state management with caching and synchronization
- **React Hook Form**: Form handling with validation
- **Framer Motion**: Animation library for smooth transitions
- **Date-fns**: Date manipulation and formatting utilities
- **Wouter**: Lightweight client-side routing
- **Class Variance Authority**: Type-safe CSS class composition