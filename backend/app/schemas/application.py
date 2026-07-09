from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.models.application import ApplicationStatus
from app.schemas.opportunity import OpportunityOut


class ApplicationStatusUpdate(BaseModel):
    status: ApplicationStatus


class ApplicationOut(BaseModel):
    id: int
    student_id: int
    opportunity_id: int
    resume_file: str
    resume_file_public_id: Optional[str] = None
    status: ApplicationStatus
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ApplicationWithOpportunityOut(ApplicationOut):
    """Used for the student's 'my applications' list, includes opportunity details."""
    opportunity: OpportunityOut
