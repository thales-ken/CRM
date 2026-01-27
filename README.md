# CRM Monorepo

A modern CRM application with React frontend and Express backend.

## Project Structure

```
CRM/
├── web/          # React + TypeScript frontend
├── backend/      # Express + TypeScript API
└── package.json  # Root workspace configuration
```

## Prerequisites

- Node.js >= 18.0.0
- Yarn >= 1.22.0

## Getting Started

### Install Dependencies

```bash
yarn install
```

### Development

Run both frontend and backend:
```bash
yarn dev
```

Run individually:
```bash
yarn dev:web      # Frontend only (http://localhost:5173)
yarn dev:backend  # Backend only (http://localhost:3001)
```

### Build

Build both projects:
```bash
yarn build
```

Build individually:
```bash
yarn build:web
yarn build:backend
```

### Environment Variables

Backend requires environment variables. Copy `.env.example` to `.env` in the backend folder:

```bash
cd backend
cp .env.example .env
```

## Tech Stack

### Frontend (web/)
- React 18
- TypeScript
- Vite
- React Router

### Backend (backend/)
- Express
- TypeScript
- CORS
- dotenv

## Available Scripts

- `yarn dev` - Run both frontend and backend in development mode
- `yarn dev:web` - Run frontend only
- `yarn dev:backend` - Run backend only
- `yarn build` - Build both projects
- `yarn build:web` - Build frontend
- `yarn build:backend` - Build backend
- `yarn lint` - Lint all workspaces
- `yarn clean` - Clean all build artifacts and node_modules
