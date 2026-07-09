from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, ConfigDict

from app.models.user import UserRole


class UserBase(BaseModel):
    name: str
    email: EmailStr
    college: Optional[str] = None
    phone: Optional[str] = None


class UserCreate(UserBase):
    """Used for public student registration. Role is forced to 'student' in the route."""
    password: str


class UserOut(UserBase):
    id: int
    role: UserRole
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    college: Optional[str] = None
    phone: Optional[str] = None
