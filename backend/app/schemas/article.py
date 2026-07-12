from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict

from app.models.article import ArticleStatus


class ArticleBase(BaseModel):
    title: str
    publication_date: Optional[datetime] = None
    description: str
    content: str
    author: Optional[str] = None
    image: Optional[str] = None
    image_public_id: Optional[str] = None
    status: ArticleStatus = ArticleStatus.Draft
    image_type: str = "landscape"


class ArticleCreate(ArticleBase):
    pass


class ArticleUpdate(BaseModel):
    title: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    content: Optional[str] = None
    author: Optional[str] = None
    image: Optional[str] = None
    image_public_id: Optional[str] = None
    status: Optional[ArticleStatus] = None
    image_type: Optional[str] = None


class ArticleOut(ArticleBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
