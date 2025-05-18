# Portfolio and Blog Website - Server Side
## 🌍 Live Link  
🔗 [Website](https://portfolio-blog-server.vercel.app/api) 

## Description

This is the backend of a Portfolio and Blog website, built with Node.js and Express.js. It provides API endpoints for managing user authentication, projects, and blog posts. Users can log in, upload projects, delete them, retrieve details, and manage blog content efficiently.

## Features of This Project
-**User Authentication:** Secure login system.

-**Project Management:** Upload, delete, and retrieve project details.

-**Blog Management:** Create, edit, and delete blog posts.

-**Database Integration:** Stores user, project, and blog data.

## Features

-**TypeScript** for strong typing and enhanced developer experience.

-**Express.js** for creating the server and APIs.

-**MongoDB** for database management using Mongoose.

-**Environment Variable** management with `dotenv`.

-**Linting and Formatting** with ESLint and Prettier.

-Development server with ts-node-dev for live reload.

-Modular architecture for scalability.

## Prerequisites

Make sure you have the following installed:

- **Node.js** (version 16 or above)
- **npm** or **yarn**
- **MongoDB instance** (local or cloud-based)

## Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory and configure your environment variables:
   ```env
   PORT=5000
   DATABASE_URL= your-mongodb-uri
   ```

## Scripts

- **Start Development Server:**

  ```bash
  npm run start:dev
  ```

- **Build for Production:**

  ```bash
  npm run build
  ```

- **Start Production Server:**

  ```bash
  npm run start:prod
  ```

- **Lint Code:**

  ```bash
  npm run lint
  ```

- **Fix Lint Issues:**

  ```bash
  npm run lint:fix
  ```

- **Format Code with Prettier:**

  ```bash
  npm run prettier
  ```

- **Fix Formatting Issues:**
  ```bash
  npm run prettier:fix
  ```

## Folder Structure

```bash
├── src
│   ├── app
│   ├    ├── config
│   ├── Modules
│   ├----├── Project
│   ├         ├── interface.ts
│   ├         ├── model.ts
│   ├         ├── route.ts
│   ├         ├── controller.ts
│   ├         ├── service.ts
│   ├----├── Project
│   ├         ├── interface.ts
│   ├         ├── model.ts
│   ├         ├── route.ts
│   ├         ├── controller.ts
│   ├         ├── service.ts
│   ├----├── Message
│   ├         ├── interface.ts
│   ├         ├── model.ts
│   ├         ├── route.ts
│   ├         ├── controller.ts
│   ├         ├── service.ts
│   └── server.ts
│   └── app.ts
├── dist                # Compiled JavaScript files
├── .eslintrc.json      # ESLint configuration
├── .prettierrc         # Prettier configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project metadata and scripts
```

## Dependencies

### Production:
- `cors`: Enable Cross-Origin Resource Sharing
- `dotenv`: Load environment variables from `.env` file
- `express`: Web framework for Node.js
- `mongoose`: MongoDB object modeling tool

### Development:
- `typescript`: TypeScript compiler
- `eslint`: Linting tool for JavaScript/TypeScript
- `prettier`: Code formatter
- `ts-node-dev`: Development server for TypeScript

---
```
