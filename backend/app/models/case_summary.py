import enum
from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, Enum, Text

from app.db.database import Base


class CaseSummaryStatus(str, enum.Enum):
    Draft = "Draft"
    Published = "Published"


class CaseSummary(Base):
    __tablename__ = "case_summaries"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    court = Column(String, nullable=False)
    category = Column(String, nullable=False)
    facts = Column(Text, nullable=False)
    issues = Column(Text, nullable=False)
    judgment = Column(Text, nullable=False)
    legal_principle = Column(Text, nullable=False)
    description = Column(Text, nullable=False)
    author = Column(String, nullable=True)
    publication_date = Column(DateTime, nullable=True)
    image = Column(String, nullable=True)
    image_public_id = Column(String, nullable=True)
    status = Column(
        Enum(CaseSummaryStatus, name="case_summary_status"),
        nullable=False,
        default=CaseSummaryStatus.Draft,
    )
    created_at = Column(DateTime, default=datetime.utcnow)
