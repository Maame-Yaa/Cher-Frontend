
This is the frontend for my Cher CRM full-stack assignment. It’s built with React, TypeScript, Vite, and connects to a FastAPI backend for user authentication, lead management, activities, and dashboard statistics.

---

The frontend handles all client-side interactions, connects securely to the backend API, and displays data in a clean and minimal interface. Because of time constraints, I focused on building the authentication flow and testing core endpoints like register, login, get profile, and view leads.

---

## Tech Stack

- React + TypeScript + Vite – for a fast and modular frontend setup  
- Axios – to handle API requests  
- React Router DOM – for routing pages  
- React Hook Form – for managing form inputs  

---

## Running Locally

```bash
# 1. Clone the repo

# 2. Install dependencies
npm install

# 3. Create an .env file
VITE_API_URL=<backend link>

# 4. Run development server
npm run dev

# 5. Build for production
npm run build
```

---

## What I learnt

- Handling authentication and token management between FastAPI and React
- Setting up protected routes and making API calls with Axios
- Using environment variables correctly in Vite
- Understanding TypeScript differences from JavaScript
- Deploying a full-stack app with Netlify (frontend) and Render (backend)

---

## Challenges

- Understanding the relationship between Pydantic and SQLAlchemy models
- Fixing authentication issues with OAuth2PasswordBearer
- Using environment variables correctly in Vite
- Managing CORS and API tokens
- Limited time to refine frontend styling and dashboard

---

This project showed me multiple ways of backend development, and helped me connect both backend and frontend more confidently. Although the dashboard and design are not fully polished, the core logic of the assignment works. If granted extension, I plan to improve the dashboard UI, connect leads and activity forms, add charts and pagination
