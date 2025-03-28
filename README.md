📚 Project Overview - next-nest-nx-template
This project is a full-stack monorepo built with NX that manages multiple projects. The two main apps are:

⚡️ Next.js Client (Frontend)

🔥 NestJS Service (Backend)

The monorepo is structured as follows:

📂 Root Level Structure
perl
Copy
Edit
/next-nest-nx-template
├── .idea                   # IDE settings (optional, IntelliJ/WebStorm specific)
├── .nx                     # NX cache and workspace configuration
├── apps                    # Application folder for Next and Nest apps
├── dist                    # Output folder for built applications
├── libs                    # Shared libraries between client and service
├── node_modules            # Node dependencies
├── .gitignore              # Git ignore config
├── .nvmrc                  # Node version for consistency
├── .prettierignore         # Files ignored by Prettier
├── .prettierrc             # Prettier config for code formatting
├── eslint.config.mjs       # ESLint config to ensure code quality
├── nx.json                 # NX workspace settings
├── package.json            # Project dependencies and scripts
├── package-lock.json       # Dependency lock file
├── README.md               # Project documentation
├── text.txt                # Sample text file (optional)
└── tsconfig.base.json      # Base TypeScript configuration for NX
📂 apps - Applications
bash
Copy
Edit
/apps
├── client                  # Next.js application (Frontend)
│   ├── app                 # App router, pages, and layouts
│   ├── components          # App-specific components
│   ├── public              # Public assets like images
│   ├── middleware.ts       # Middleware for Next APIs
│   ├── .env                # Environment variables
│   ├── .env.development    # Dev-specific env variables
│   └── next-build-standalone.js  # Script for building standalone Next app
│
└── service                 # NestJS application (Backend)
├── src
│   ├── app             # Application-level settings and modules
│   ├── assets          # Static files/assets
│   ├── auth            # Auth module (JWT, guards, strategies)
│   ├── user            # User module for business logic
│   └── main.ts         # Application entry point
└── webpack.config.js   # Webpack configuration for NestJS build
📚 libs - Shared Code
graphql
Copy
Edit
/libs
├── client                  # Shared client-side code for Next apps
│   ├── components          # Reusable UI components
│   ├── mantine-theme       # Mantine theme and configurations
│   ├── mui-theme           # MUI theme and styles
│   ├── schemas             # Form validation schemas
│   └── mantine-notify      # Notification utilities for Mantine
│
├── common                  # Shared code between Next and Nest apps
│   ├── api-response-model  # API response model for consistency
│   ├── api.client.ts       # API client for fetching APIs
│   ├── api-endpoints.ts    # API route definitions
│   ├── api-util.ts         # Utility functions for handling APIs
│   └── auth-service        # Auth utility functions for Next.js
│
└── server                  # Shared server-side code for Nest apps
├── config              # Configs for CORS, JWT, MongoDB, Swagger, etc.
├── decorators          # Custom decorators like @Public and @Role
├── dtos                # DTOs (Data Transfer Objects)
├── exceptions          # Exception handling classes
├── filters             # Global HTTP exception filters
├── guard               # Auth guards (JWT, Role-based)
├── middleware          # Middleware (request logging, etc.)
├── schemas             # MongoDB schemas
├── strategy            # JWT Passport strategy
├── utils               # Utility functions like bcrypt, etc.
└── base.controller.ts  # Base controller logic (extends functionality)
📂 dist - Build Output
bash
Copy
Edit
/dist
├── client                  # Standalone build for Next.js app
└── service                 # Build output for NestJS app
📜 Project Highlights
✅ TypeScript & Linting: Strict typing with shared tsconfigs and ESLint rules.
✅ Authentication: JWT-based auth, Guards, and Middleware for secure APIs.
✅ Standalone Builds: Using next-build-standalone.js for optimized Next.js deployment.
✅ Shared Code: Reuse models, DTOs, and utilities between the frontend and backend.
✅ API Consistency: Consistent API responses using api-response-model shared in common.

🚀 Getting Started
bash
Copy
Edit
# Install dependencies
npm install

# Run Next.js app
npx nx run client:dev

# Run NestJS service
npx nx run service:dev

# Build applications
npx nx build client
npx nx build service
🎉 Future Enhancements
💡 Add more services and client apps to scale.

📚 Create a documentation site using Storybook.

🔥 Implement GraphQL API in addition to REST.