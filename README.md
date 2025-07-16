# Tärtip - Kanban Todo Board

A modern, drag-and-drop Kanban-style todo board application built with React, TypeScript, and Redux Toolkit. Organize your tasks efficiently with multiple boards and intuitive drag-and-drop functionality.

## ✨ Features

- **Multiple Boards**: Create and manage multiple todo boards
- **Drag & Drop**: Intuitive drag-and-drop functionality for moving todos between boards
- **CRUD Operations**: Add, edit, and delete both boards and todos
- **Responsive Design**: Modern UI built with Tailwind CSS
- **Type Safety**: Full TypeScript support for better development experience
- **State Management**: Redux Toolkit for efficient state management
- **Modal Interface**: Clean modal-based interface for adding and editing items

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- Yarn or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Tartip
```

2. Install dependencies:
```bash
yarn install
# or
npm install
```

3. Start the development server:
```bash
yarn dev
# or
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Board/          # Board-related components
│   ├── Container/      # Layout components
│   ├── Header/         # Header component
│   ├── Modal/          # Modal components
│   └── Todo/           # Todo item components
├── constants/          # Application constants
├── helpers/            # Utility functions
├── icons/              # Icon components
├── models/             # TypeScript type definitions
├── state/              # Redux store and slices
│   ├── initialStates/  # Initial state definitions
│   └── slices/         # Redux Toolkit slices
└── main.tsx           # Application entry point
```
