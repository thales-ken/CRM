# CRM Frontend

A modern Customer Relationship Management (CRM) application built with React, TypeScript, and Vite.

## Features

- **Dashboard** - KPI metrics and real-time statistics
- **Contact Management** - Manage customer contacts and interactions
- **Lead Pipeline** - Track and manage sales opportunities
- **Task Management** - Organize and track tasks
- **Company Records** - Maintain company information
- **Activity Tracking** - Monitor all customer interactions
- **Responsive UI** - Works on desktop and tablet devices

## Tech Stack

- **React 19** - Latest React with improved performance
- **TypeScript 5.9** - Type-safe development
- **Vite 7.2** - Fast build tool with HMR
- **Yarn** - Package manager
- **Plain CSS** - Custom styling without external frameworks

## Project Structure

```
frontend/
├── src/
│   ├── components/        # React components
│   │   ├── Dashboard/     # Dashboard component
│   │   ├── Navigation/    # Sidebar navigation
│   │   └── Common/        # Reusable UI components
│   ├── context/           # Global state (CRM Context)
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API services layer
│   ├── types/             # TypeScript interfaces
│   ├── mocks/             # Mock data for development
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Entry point
├── public/                # Static assets
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- Yarn

### Installation

```bash
cd frontend
yarn install
```

### Development

```bash
yarn dev
```

The app will be available at `http://localhost:5173/`

### Build

```bash
yarn build
```

### Preview

```bash
yarn preview
```

## Features by Page

### Dashboard
- Real-time KPI cards (Contacts, Opportunities, Pipeline Value, Closing Deals)
- Conversion rate metrics
- Average deal size tracking
- Recent activity feed

### Navigation
- Collapsible sidebar with smooth transitions
- Quick access to all main sections
- User profile card with role information
- Active page highlighting

## Mock Data

The application comes with comprehensive mock data including:
- 4 Users with different roles
- 3 Companies
- 5 Contacts
- 5 Leads
- 5 Tasks
- 5 Activities

All data is managed through a mock API service layer with realistic latency simulation.

## Development Features

- **Custom Hooks** - 8 reusable hooks for common patterns
- **Global State** - CRM Context for centralized state management
- **Type Safety** - Full TypeScript support with strict mode
- **Hot Module Replacement** - Instant updates during development
- **API Services** - Mock service layer with CRUD operations

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT
