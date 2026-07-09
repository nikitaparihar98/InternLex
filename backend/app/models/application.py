import enum
from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, Enum, ForeignKey
from sqlalchemy.orm import relationship

from app.db.database import Base


class ApplicationStatus(str, enum.Enum):
    Applied = "Applied"
    Reviewed = "Reviewed"
    Shortlisted = "Shortlisted"
    Assignment_Sent = "Assignment Sent"
    Selected = "Selected"
    Rejected = "Rejected"


class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    opportunity_id = Column(Integer, ForeignKey("opportunities.id", ondelete="CASCADE"), nullable=False)
    resume_file = Column(String, nullable=False)
    resume_file_public_id = Column(String, nullable=True)
    status = Column(
        Enum(
            ApplicationStatus,
            name="application_status",
            values_callable=lambda enum_cls: [e.value for e in enum_cls],
        ),
        nullable=False,
        default=ApplicationStatus.Applied,
    )
    created_at = Column(DateTime, default=datetime.utcnow)

    student = relationship("User", back_populates="applications", foreign_keys=[student_id])
    opportunity = relationship("Opportunity", back_populates="applications")
    assignments = relationship("Assignment", back_populates="application", cascade="all, delete-orphan")
