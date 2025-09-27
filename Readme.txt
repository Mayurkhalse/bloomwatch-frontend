================================================================================
                           BLOOM WATCH PROJECT DOCUMENTATION
================================================================================

TABLE OF CONTENTS:
1. PROJECT OVERVIEW
2. PROJECT STRUCTURE
3. CONFIGURATION FILES
4. SOURCE CODE STRUCTURE
5. COMPONENT DOCUMENTATION
6. DATA STRUCTURES & FLOW
7. UTILITY FUNCTIONS
8. DEPENDENCIES & TECHNOLOGIES
9. DEVELOPMENT SETUP
10. FEATURE IMPLEMENTATION DETAILS

================================================================================
1. PROJECT OVERVIEW
================================================================================

PROJECT NAME: Bloom Watch
PURPOSE: Water Quality Monitoring Application for Harmful Algal Blooms (HABs)
TECHNOLOGY STACK: React 18.3.1 + TypeScript + Vite + Tailwind CSS + Leaflet
VERSION: 0.0.0 (Development)

DESCRIPTION:
Bloom Watch is a comprehensive web application designed for monitoring and 
analyzing harmful algal blooms in water bodies. The application provides 
real-time visualization, data analysis, and reporting capabilities for 
environmental monitoring professionals.

KEY FEATURES:
- Interactive map with bloom location visualization
- Region-based data filtering (user-drawn rectangles)
- Real-time bloom monitoring with severity indicators
- Historical and predictive trend analysis
- Dashboard with statistical summaries
- Data export capabilities (JSON, CSV)
- User authentication system
- Notification system for bloom alerts

================================================================================
2. PROJECT STRUCTURE
================================================================================

Bloomwatchtry-main/
├── public/                          # Static assets (if any)
├── src/                            # Source code directory
│   ├── components/                 # React components
│   │   ├── Auth/                   # Authentication components
│   │   ├── Common/                 # Shared/reusable components
│   │   ├── Dashboard/              # Dashboard-specific components
│   │   ├── Map/                    # Map-related components
│   │   └── Navigation/             # Navigation components
│   ├── data/                       # Data structures and mock data
│   ├── utils/                      # Utility functions and constants
│   ├── App.tsx                     # Main application component
│   ├── main.tsx                    # Application entry point
│   ├── index.css                   # Global styles
│   └── vite-env.d.ts              # Vite type definitions
├── node_modules/                   # Dependencies
├── package.json                    # Project configuration and dependencies
├── package-lock.json              # Dependency lock file
├── vite.config.ts                 # Vite build configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
├── tsconfig.app.json              # TypeScript app configuration
├── tsconfig.node.json             # TypeScript node configuration
├── eslint.config.js               # ESLint configuration
├── postcss.config.js              # PostCSS configuration
├── index.html                     # HTML entry point
└── README.txt                     # This documentation file

================================================================================
3. CONFIGURATION FILES
================================================================================

3.1 PACKAGE.JSON
Purpose: Project configuration, dependencies, and scripts
Location: /package.json

KEY PROPERTIES:
- name: "vite-react-typescript-starter" (Project identifier)
- version: "0.0.0" (Current version)
- type: "module" (ES modules enabled)
- private: true (Not published to npm)

SCRIPTS:
- "dev": "vite" (Start development server)
- "build": "vite build" (Build for production)
- "lint": "eslint ." (Run linting)
- "preview": "vite preview" (Preview production build)
- "typecheck": "tsc --noEmit -p tsconfig.app.json" (Type checking)

DEPENDENCIES (Production):
- @supabase/supabase-js: ^2.57.4 (Database client - configured but not used)
- date-fns: ^4.1.0 (Date manipulation library)
- leaflet: ^1.9.4 (Interactive maps)
- lucide-react: ^0.344.0 (Icon library)
- react: ^18.3.1 (React framework)
- react-dom: ^18.3.1 (React DOM)
- react-leaflet: ^4.2.1 (React wrapper for Leaflet)
- recharts: ^3.2.1 (Chart library)

DEV DEPENDENCIES:
- @eslint/js: ^9.9.1 (ESLint core)
- @types/react: ^18.3.5 (React TypeScript types)
- @types/react-dom: ^18.3.0 (React DOM TypeScript types)
- @vitejs/plugin-react: ^4.3.1 (Vite React plugin)
- autoprefixer: ^10.4.18 (CSS autoprefixer)
- eslint: ^9.9.1 (Linting tool)
- eslint-plugin-react-hooks: ^5.1.0-rc.0 (React hooks linting)
- eslint-plugin-react-refresh: ^0.4.11 (React refresh linting)
- globals: ^15.9.0 (Global variables)
- postcss: ^8.4.35 (CSS processor)
- tailwindcss: ^3.4.1 (CSS framework)
- typescript: ^5.5.3 (TypeScript compiler)
- typescript-eslint: ^8.3.0 (TypeScript ESLint)
- vite: ^5.4.2 (Build tool)

3.2 VITE.CONFIG.TS
Purpose: Vite build tool configuration
Location: /vite.config.ts

CONFIGURATION:
- plugins: [react()] (React plugin enabled)
- optimizeDeps.exclude: ['lucide-react'] (Exclude from optimization)

3.3 TAILWIND.CONFIG.JS
Purpose: Tailwind CSS configuration
Location: /tailwind.config.js

CONFIGURATION:
- content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'] (File patterns to scan)
- theme.extend: {} (Extended theme - currently empty)
- plugins: [] (No additional plugins)

3.4 TSCONFIG.JSON
Purpose: Main TypeScript configuration
Location: /tsconfig.json

CONFIGURATION:
- files: [] (No direct files)
- references: [tsconfig.app.json, tsconfig.node.json] (Project references)

3.5 TSCONFIG.APP.JSON
Purpose: Application TypeScript configuration
Location: /tsconfig.app.json

COMPILER OPTIONS:
- target: "ES2020" (ECMAScript target)
- useDefineForClassFields: true (Class field definitions)
- lib: ["ES2020", "DOM", "DOM.Iterable"] (Library files)
- module: "ESNext" (Module system)
- skipLibCheck: true (Skip library checking)
- moduleResolution: "bundler" (Module resolution)
- allowImportingTsExtensions: true (Allow .ts extensions)
- isolatedModules: true (Isolated modules)
- moduleDetection: "force" (Force module detection)
- noEmit: true (No output files)
- jsx: "react-jsx" (React JSX transform)
- strict: true (Strict type checking)
- noUnusedLocals: true (Error on unused locals)
- noUnusedParameters: true (Error on unused parameters)
- noFallthroughCasesInSwitch: true (Error on switch fallthrough)

3.6 TSCONFIG.NODE.JSON
Purpose: Node.js TypeScript configuration
Location: /tsconfig.node.json

COMPILER OPTIONS:
- target: "ES2022" (ECMAScript target)
- lib: ["ES2023"] (Library files)
- module: "ESNext" (Module system)
- skipLibCheck: true (Skip library checking)
- moduleResolution: "bundler" (Module resolution)
- allowImportingTsExtensions: true (Allow .ts extensions)
- isolatedModules: true (Isolated modules)
- moduleDetection: "force" (Force module detection)
- noEmit: true (No output files)
- strict: true (Strict type checking)
- noUnusedLocals: true (Error on unused locals)
- noUnusedParameters: true (Error on unused parameters)
- noFallthroughCasesInSwitch: true (Error on switch fallthrough)

3.7 ESLINT.CONFIG.JS
Purpose: ESLint linting configuration
Location: /eslint.config.js

CONFIGURATION:
- ignores: ['dist'] (Ignore dist directory)
- extends: [js.configs.recommended, tseslint.configs.recommended] (Base configs)
- files: ['**/*.{ts,tsx}'] (File patterns)
- languageOptions.ecmaVersion: 2020 (ECMAScript version)
- languageOptions.globals: globals.browser (Browser globals)
- plugins: react-hooks, react-refresh (React plugins)
- rules: React hooks and refresh rules

3.8 POSTCSS.CONFIG.JS
Purpose: PostCSS configuration
Location: /postcss.config.js

CONFIGURATION:
- plugins: { tailwindcss: {}, autoprefixer: {} } (CSS processing plugins)

3.9 INDEX.HTML
Purpose: HTML entry point
Location: /index.html

CONTENT:
- DOCTYPE: html5
- lang: "en"
- charset: "UTF-8"
- viewport: "width=device-width, initial-scale=1.0"
- title: "Bloom Watch - Water Quality Monitoring"
- Custom CSS for scrollbar and slider styling
- div#root (React mount point)
- script: /src/main.tsx (Application entry)

CUSTOM STYLES:
- Webkit scrollbar styling (dark theme)
- Custom slider thumb styling (blue theme)

================================================================================
4. SOURCE CODE STRUCTURE
================================================================================

4.1 MAIN.TSX
Purpose: Application entry point
Location: /src/main.tsx

IMPORTS:
- StrictMode: React strict mode wrapper
- createRoot: React 18 root creation
- App: Main application component
- './index.css': Global styles

VARIABLES:
- document.getElementById('root'): DOM element reference

FUNCTIONALITY:
- Creates React root with StrictMode
- Renders App component
- Mounts to #root element

4.2 INDEX.CSS
Purpose: Global CSS styles
Location: /src/index.css

CONTENT:
- @tailwind base: Tailwind base styles
- @tailwind components: Tailwind component styles
- @tailwind utilities: Tailwind utility classes

4.3 VITE-ENV.D.TS
Purpose: Vite type definitions
Location: /src/vite-env.d.ts

CONTENT:
- Vite client type definitions for TypeScript

================================================================================
5. COMPONENT DOCUMENTATION
================================================================================

5.1 APP.TSX
Purpose: Main application component and state management
Location: /src/App.tsx

IMPORTS:
- useState, useEffect: React hooks
- Navbar: Navigation component
- Sidebar: Sidebar navigation component
- BloomMap: Map component
- BloomPopup: Bloom details modal
- Dashboard: Dashboard component
- TimeSlider: Time control component
- NotificationPanel: Notifications component
- LoginForm: Login form component
- SignupForm: Signup form component
- mockBloomEvents, mockRegions, mockNotifications, BloomEvent: Data types

STATE VARIABLES:
- user: { name: string; email: string } | null (Current user)
- showLogin: boolean (Show login vs signup form)
- isAuthenticated: boolean (Authentication status)
- activeTab: string (Current navigation tab)
- isSidebarOpen: boolean (Sidebar visibility)
- isNotificationPanelOpen: boolean (Notification panel visibility)
- selectedBloom: BloomEvent | null (Selected bloom for details)
- isBloomPopupOpen: boolean (Bloom popup visibility)
- blooms: BloomEvent[] (All bloom data)
- selectedRegions: string[] (Selected region IDs)
- userRegion: { bounds, isDrawing, isEditing } (User's drawn region)
- currentDate: string (Current time slider date)
- isPlaying: boolean (Time slider play state)
- notifications: Notification[] (Notification data)

COMPUTED VALUES:
- filteredBlooms: BloomEvent[] (Blooms filtered by user region)

FUNCTIONS:
- handleLogin(email, password): Simulate login
- handleSignup(name, email, password): Simulate signup
- handleLogout(): Clear user session
- handleShowBloomDetails(bloom): Show bloom details modal
- handleRegionToggle(regionId): Toggle region selection
- handleMarkNotificationAsRead(id): Mark notification as read
- handleMarkAllNotificationsAsRead(): Mark all notifications as read
- handleStartDrawing(): Start region drawing mode
- handleStopDrawing(): Stop region drawing mode
- handleRegionDrawn(bounds): Handle completed region drawing
- handleEditRegion(): Toggle region editing mode
- handleClearRegion(): Clear user's region

EFFECTS:
- Auto-play time slider (5-second demo)

RENDER LOGIC:
- Authentication check: Show login/signup if not authenticated
- Main layout: Navbar, Sidebar, NotificationPanel, Main content
- Tab-based content: Map, Dashboard, or placeholder sections
- Region controls overlay on map
- Time slider overlay on map
- Bloom popup modal

5.2 NAVBAR.TSX
Purpose: Top navigation bar
Location: /src/components/Navigation/Navbar.tsx

IMPORTS:
- React: React library
- Menu, Bell, User, LogOut, Settings: Lucide icons

PROPS INTERFACE:
- onToggleSidebar: () => void (Toggle sidebar)
- onToggleNotifications: () => void (Toggle notifications)
- onLogout: () => void (Logout handler)
- user: { name: string; email: string } | null (User data)

COMPONENT STRUCTURE:
- Left section: Menu button, logo, title
- Right section: Notifications bell, user info, settings, logout
- Conditional rendering based on user authentication

STYLING:
- Dark theme with backdrop blur
- Hover effects and transitions
- Notification badge (red dot)
- User avatar placeholder

5.3 SIDEBAR.TSX
Purpose: Left sidebar navigation
Location: /src/components/Navigation/Sidebar.tsx

IMPORTS:
- React: React library
- Map, BarChart3, Settings, FileText, Download: Lucide icons

PROPS INTERFACE:
- isOpen: boolean (Sidebar visibility)
- activeTab: string (Current active tab)
- onTabChange: (tab: string) => void (Tab change handler)

MENU ITEMS:
- map: "Live Map" (Map icon)
- dashboard: "Dashboard" (BarChart3 icon)
- reports: "Reports" (FileText icon)
- exports: "Exports" (Download icon)
- settings: "Settings" (Settings icon)

COMPONENT STRUCTURE:
- Fixed positioning with transition animations
- Navigation buttons with active state styling
- Responsive width (64 when open, 0 when closed)

STYLING:
- Dark theme with backdrop blur
- Active state: Blue background
- Hover effects
- Smooth transitions

5.4 BLOOMMAP.TSX
Purpose: Interactive map with bloom visualization and region drawing
Location: /src/components/Map/BloomMap.tsx

IMPORTS:
- React, useRef, useEffect: React hooks
- MapContainer, TileLayer, Rectangle, useMapEvents: React-Leaflet
- BloomEvent: Data type
- MAP_CENTER, MAP_ZOOM: Constants
- BloomMarker: Marker component
- 'leaflet/dist/leaflet.css': Leaflet styles

PROPS INTERFAC