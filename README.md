# InternLex

InternLex is a high-performance, modern, and beautifully designed web platform tailored for legal professionals, students, and organizations. The platform serves as a centralized hub for legal opportunities, expert articles, community blogs, and landmark case commentaries.

---

## Features

- **Opportunity Hub**: Browse, search, and filter internships, jobs, webinars, and competitions.
- **Legal Knowledge Hub**: A rich compilation of expert Articles and community Blogs with an elegant custom layout.
- **Case Commentaries**: Concise, structured summaries of landmark judgments, facts, issues, legal principles, and rulings.
- **Admin Management Portal**: A secure dashboard for admins to publish and manage articles, blogs, case commentaries, and opportunities using a React 19-compatible, format-preserving custom rich text editor.
- **Enterprise-Grade Storage**: Uploads of images, banners, and documents are automatically hosted on Cloudinary, organized in folders, and synced with PostgreSQL records (supporting delete lifecycles and ON DELETE CASCADE constraint safety).
- **Responsive & Premium UI**: Built with a sophisticated cream/gold aesthetic, modern typography (Inter, Cormorant Garamond), custom layouts, and Framer Motion transitions.

---

## Tech Stack

### Frontend
- **React 19**
- **Vite** (Build Tool)
- **React Router 7** (Routing)
- **Framer Motion 12** (Animations & Transitions)
- **Axios** (REST Client)
- **Vanilla CSS** (Custom Premium Design System)

### Backend
- **FastAPI** (Python Web Framework)
- **SQLAlchemy** (Object Relational Mapper)
- **PostgreSQL** (Database)
- **Cloudinary** (Cloud Asset Management)
- **JWT (JSON Web Tokens)** (Authentication & Session Control)

---

## Project Structure

```
InternLex/
├── backend/                  # FastAPI Backend
│   ├── app/
│   │   ├── api/              # API Route Handlers (auth, opportunities, articles, blogs, case_commentaries, users)
│   │   ├── core/             # Application config and security settings
│   │   ├── db/               # Database connection and init scripts
│   │   ├── models/           # SQLAlchemy DB Models
│   │   ├── schemas/          # Pydantic Schemas
│   │   └── utils/            # Storage and upload utility helpers
│   ├── requirements.txt      # Python dependencies
│   ├── run.sh                # Script to start Uvicorn reload server
│   └── migrate_storage.py    # Database schema migration script
│
├── frontend/                 # Vite + React Frontend
│   ├── src/
│   │   ├── components/       # layout (Header/Footer), sections, ui (RichTextEditor)
│   │   ├── context/          # AuthContext for session management
│   │   ├── pages/            # Public pages (About, Opportunities, Articles, Blogs, CaseCommentaries) and Admin views
│   │   ├── services/         # API clients (api.js, contentApi.js)
│   │   └── utils/            # Frontend helper functions
│   ├── package.json          # Node dependencies
│   └── vite.config.js        # Vite build config
```

---

## Environment Variables

### Backend Configuration (`backend/.env`)

Configure the following variables in your `.env` file:

```env
# Database Connection
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<dbname>

# Security Configuration
SECRET_KEY=your_access_token_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440

# Default Admin Seed Account
ADMIN_NAME=Admin
ADMIN_EMAIL=admin@internlex.com
ADMIN_PASSWORD=StrongPassword123!

# Cloudinary Integration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend Configuration (`frontend/.env`)

Create a `.env` file in the `frontend` folder for production builds:

```env
VITE_API_URL=https://api.internlex.in/api
```

---

## Installation & Local Setup

### Database Setup
1. Create a PostgreSQL database locally or host it on a cloud service (e.g. Supabase, AWS RDS).
2. Note your database connection string and set it in the `DATABASE_URL` field in `backend/.env`.

### Running the Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create and activate a Python virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the database migrations:
   ```bash
   python migrate_storage.py
   ```
5. Start the FastAPI server:
   ```bash
   bash run.sh
   ```
   The backend API will run locally at `http://127.0.0.1:8000`.

### Running the Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install npm packages:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   The frontend application will run locally at `http://localhost:5173`.

---

## Cloudinary Folder Structure

Assets are automatically organized into folders in Cloudinary upon upload:
- `internlex/articles` — Images for articles.
- `internlex/blogs` — Images for blogs.
- `internlex/case-commentaries` — Images for case summaries.
- `internlex/opportunities` — Opportunity banner images.
- `internlex/resumes` — Student resumes (PDF, DOCX).
- `internlex/submissions` — Student assignment submission documents (PDF, DOCX).

---

## API Overview

### Authentication & Users
- `POST /api/auth/register` — Register a student account
- `POST /api/auth/login` — Login to receive a JWT token and profile details
- `GET /api/auth/me` — Read current logged-in user profile
- `PUT /api/auth/me` — Update current user profile
- `GET /api/users` — Admin-only: list all registered users

### Opportunities
- `GET /api/opportunities` — List all opportunities
- `POST /api/opportunities` — Admin-only: create new opportunity
- `PUT /api/opportunities/{id}` — Admin-only: update opportunity
- `DELETE /api/opportunities/{id}` — Admin-only: delete opportunity

### Articles
- `GET /api/articles` — List all published articles
- `POST /api/articles` — Admin-only: create new article
- `PUT /api/articles/{id}` — Admin-only: update article
- `DELETE /api/articles/{id}` — Admin-only: delete article

### Blogs
- `GET /api/blogs` — List all published blogs
- `POST /api/blogs` — Admin-only: create new blog
- `PUT /api/blogs/{id}` — Admin-only: update blog
- `DELETE /api/blogs/{id}` — Admin-only: delete blog

### Case Commentaries
- `GET /api/case-commentaries` — List all commentaries
- `POST /api/case-commentaries` — Admin-only: create commentary
- `PUT /api/case-commentaries/{id}` — Admin-only: update commentary
- `DELETE /api/case-commentaries/{id}` — Admin-only: delete commentary

---

## Deployment Instructions

### 1. Backend Deployment (e.g. Render, Railway, AWS ECS)
1. Link your repository.
2. Set the build command: `pip install -r requirements.txt`.
3. Set the start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
4. Add all environment variables (from `backend/.env`) in the provider dashboard.
5. Apply database migrations during build or via CLI: `python migrate_storage.py`.

### 2. Frontend Deployment (e.g. Vercel, Netlify, Cloudflare Pages)
1. Set the framework preset to **Vite**.
2. Add the environment variable `VITE_API_URL` pointing to your hosted backend (e.g., `https://api.internlex.in`).
3. Set the build command: `npm run build`.
4. Set the publish directory: `dist`.

### 3. Domain & DNS Routing
- Connect `internlex.in` to your frontend hosting provider.
- Configure subdomain `api.internlex.in` to point to the backend hosting provider.

---

## Future Improvements
- Implement a complete assignment and grading module directly inside the student dashboard.
- Add email notifications to alert students about new opportunities or application status changes.
- Introduce advanced full-text search capabilities using PostgreSQL `tsvector`.

---

## License

This project is licensed under the MIT License.
