"""
Admin-only user management routes.
"""
from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import require_admin
from app.db.database import get_db
from app.models.user import User
from app.schemas.user import UserOut

router = APIRouter()


@router.get("", response_model=List[UserOut])
def list_users(db: Session = Depends(get_db), _admin=Depends(require_admin)):
    """Admin only: list all users."""
    return db.query(User).order_by(User.created_at.desc()).all()


@router.get("/{user_id}", response_model=UserOut)
def get_user(user_id: int, db: Session = Depends(get_db), _admin=Depends(require_admin)):
    """Admin only: get a single user by id."""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user
