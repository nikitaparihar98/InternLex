"""
Development-time database initialization:
- Creates all tables from the SQLAlchemy models (Base.metadata.create_all).
- Seeds one admin account if it doesn't already exist.

NOTE: For production, use a proper migration tool (e.g. Alembic) instead of
create_all. This is intentionally simple, per project requirements.
"""
from app.core.config import settings
from app.core.security import hash_password
from app.db.database import Base, engine, SessionLocal

# Import every model so that they are registered on Base.metadata
# before create_all() is called.
from app.models.user import User, UserRole
from app.models.opportunity import Opportunity  # noqa: F401
from app.models.article import Article  # noqa: F401
from app.models.blog import Blog  # noqa: F401
from app.models.case_summary import CaseSummary  # noqa: F401
from app.models.application import Application  # noqa: F401
from app.models.assignment import Assignment  # noqa: F401
from app.models.submission import Submission  # noqa: F401


def create_tables():
    Base.metadata.create_all(bind=engine)


def seed_admin():
    """
    Creates a default admin account if one does not already exist.
    Admin credentials come from .env (ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD).
    """
    db = SessionLocal()
    try:
        existing_admin = db.query(User).filter(User.email == settings.ADMIN_EMAIL).first()
        if existing_admin:
            return

        admin = User(
            name=settings.ADMIN_NAME,
            email=settings.ADMIN_EMAIL,
            hashed_password=hash_password(settings.ADMIN_PASSWORD),
            role=UserRole.admin,
        )
        db.add(admin)
        db.commit()
        print(f"Seeded admin account: {settings.ADMIN_EMAIL}")
    finally:
        db.close()


def init_db():
    create_tables()
    seed_admin()
