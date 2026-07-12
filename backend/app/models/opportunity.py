import enum
from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, Enum, Text
from sqlalchemy.orm import relationship

from app.db.database import Base


class OpportunityType(str, enum.Enum):
    Internship = "Internship"
    Job = "Job"
    Webinar = "Webinar"
    Competition = "Competition"


class OpportunityMode(str, enum.Enum):
    Online = "Online"
    Offline = "Offline"
    Hybrid = "Hybrid"


class OpportunityStatus(str, enum.Enum):
    Published = "Published"
    Closed = "Closed"


class Opportunity(Base):
    __tablename__ = "opportunities"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    type = Column(Enum(OpportunityType, name="opportunity_type"), nullable=False)
    organization = Column(String, nullable=False)
    location = Column(String, nullable=True)
    mode = Column(Enum(OpportunityMode, name="opportunity_mode"), nullable=False)
    deadline = Column(DateTime, nullable=False)
    description = Column(Text, nullable=False)
    eligibility = Column(Text, nullable=True)
    skills = Column(String, nullable=True)
    banner_image = Column(String, nullable=True)
    banner_image_public_id = Column(String, nullable=True)
    image_type = Column(String, nullable=False, default="landscape")
    apply_link = Column(String, nullable=True)
    status = Column(
        Enum(OpportunityStatus, name="opportunity_status"),
        nullable=False,
        default=OpportunityStatus.Published,
    )
    created_at = Column(DateTime, default=datetime.utcnow)

    applications = relationship("Application", back_populates="opportunity", cascade="all, delete-orphan")
