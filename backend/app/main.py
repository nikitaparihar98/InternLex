"""
InternLex backend entry point.

Run with:
    uvicorn app.main:app --reload
"""
# pyrefly: ignore [missing-import]
from fastapi import FastAPI
# pyrefly: ignore [missing-import]
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.db.init_db import init_db

# NOTE: these routers are generated in Part 2 of this backend
# (app/api/auth.py, opportunities.py, articles.py, blogs.py,
#  case_commentaries.py, applications.py, assignments.py, users.py)
from app.api import auth
from app.api import users
from app.api import opportunities
from app.api import articles
from app.api import blogs
from app.api import case_commentaries

app = FastAPI(
    title="InternLex API",
    description="Backend API for InternLex - a legal learning and opportunity management platform.",
    version="1.0.0",
)

# ---------------------------------------------------------------------------
# CORS - allow the React frontend (Vite dev server) to call this API
# ---------------------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# (Legacy) Static file serving removed in favor of Cloudinary URLs
# ---------------------------------------------------------------------------


# ---------------------------------------------------------------------------
# Startup: create tables + seed admin (development convenience only)
# ---------------------------------------------------------------------------
@app.on_event("startup")
def on_startup():
    init_db()


# ---------------------------------------------------------------------------
# Routers
# ---------------------------------------------------------------------------
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(opportunities.router, prefix="/api/opportunities", tags=["Opportunities"])
app.include_router(articles.router, prefix="/api/articles", tags=["Articles"])
app.include_router(blogs.router, prefix="/api/blogs", tags=["Blogs"])
app.include_router(case_commentaries.router, prefix="/api/case-commentaries", tags=["Case Commentaries"])


@app.get("/")
def root():
    return {"message": "InternLex API is running"}

