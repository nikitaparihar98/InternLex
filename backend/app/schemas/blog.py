from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict

from app.models.blog import BlogStatus


class BlogBase(BaseModel):
    title: str
    publication_date: Optional[datetime] = None
    description: str
    content: str
    author: Optional[str] = None
    image: Optional[str] = None
    image_public_id: Optional[str] = None
    status: BlogStatus = BlogStatus.Draft


class BlogCreate(BlogBase):
    pass


class BlogUpdate(BaseModel):
    title: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    content: Optional[str] = None
    author: Optional[str] = None
    image: Optional[str] = None
    image_public_id: Optional[str] = None
    status: Optional[BlogStatus] = None


class BlogOut(BlogBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
