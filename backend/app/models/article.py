import enum
from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, Enum, Text

from app.db.database import Base


class ArticleStatus(str, enum.Enum):
    Draft = "Draft"
    Published = "Published"


class Article(Base):
    __tablename__ = "articles"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    publication_date = Column(DateTime, nullable=True)
    description = Column(Text, nullable=False)
    content = Column(Text, nullable=False)
    author = Column(String, nullable=True)
    image = Column(String, nullable=True)
    image_public_id = Column(String, nullable=True)
    image_type = Column(String, nullable=False, default="landscape")
    status = Column(
        Enum(ArticleStatus, name="article_status"),
        nullable=False,
        default=ArticleStatus.Draft,
    )
    created_at = Column(DateTime, default=datetime.utcnow)
