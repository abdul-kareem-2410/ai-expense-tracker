# AI-Powered Expense Tracker

A smart expense tracking application that automatically categorizes your expenses using AI-powered keyword analysis, built with React and Next.js.

## Overview

The AI Expense Tracker is an intelligent financial management tool that simplifies expense tracking by automatically suggesting categories for your expenses. Instead of manually categorizing each expense, the application analyzes the description you provide and uses keyword-based AI logic to intelligently suggest the most appropriate category.

## Key Features

**Smart Categorization**: The core AI feature analyzes expense descriptions using a comprehensive keyword database to automatically suggest categories like "Food & Dining", "Transportation", "Shopping", etc. The system provides confidence scores and multiple suggestions for each expense.

**Real-time AI Suggestions**: As you type an expense description, the AI categorizer immediately provides category suggestions with confidence percentages, making expense entry quick and accurate.

**Comprehensive Analytics**: The insights dashboard generates intelligent spending analysis including category breakdowns, monthly trends, average daily spending, and top spending categories with visual progress bars.

**Expense Management**: Full CRUD operations for expenses with filtering by category, date range searching, and the ability to override AI suggestions when needed.

**Data Persistence**: All expenses are stored locally using browser localStorage, ensuring your data persists between sessions without requiring a backend database.

## Technical Implementation

**AI Categorization Engine**: Built a custom keyword-matching algorithm that scores expense descriptions against predefined category keywords. The system calculates confidence levels and provides multiple category suggestions ranked by relevance.

**Smart Insights Generation**: Implemented algorithms to analyze spending patterns, calculate monthly trends over 6-month periods, identify top spending categories, and generate actionable financial insights.

**Form Validation**: Integrated Zod schema validation for robust data validation and React Hook Form for smooth form handling with real-time validation feedback.

**Responsive Design**: Created a mobile-first responsive interface using Tailwind CSS with adaptive layouts that work seamlessly across desktop, tablet, and mobile devices.

## Technologies Used

- **Frontend Framework**: Next.js 14 with App Router for modern React development
- **Styling**: Tailwind CSS for utility-first responsive design
- **Form Management**: React Hook Form with Zod validation schemas
- **State Management**: Custom React hooks for expense management and AI insights
- **Icons**: Lucide React for consistent, beautiful iconography
- **Data Storage**: Browser localStorage for client-side data persistence
- **AI Logic**: Custom JavaScript algorithms for keyword-based expense categorization


## Architecture

The application follows a clean component-based architecture with custom hooks for business logic, reusable UI components, and a centralized AI categorization system. The expense data flows through React hooks that handle CRUD operations, while the AI engine processes descriptions in real-time to provide intelligent category suggestions.
