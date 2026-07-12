from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict

from app.models.opportunity import OpportunityType, OpportunityMode, OpportunityStatus


class OpportunityBase(BaseModel):
    title: str
    type: OpportunityType
    organization: str
    location: Optional[str] = None
    mode: OpportunityMode
    deadline: datetime
    description: str
    eligibility: Optional[str] = None
    skills: Optional[str] = None
    banner_image: Optional[str] = None
    banner_image_public_id: Optional[str] = None
    apply_link: Optional[str] = None
    status: OpportunityStatus = OpportunityStatus.Ongoing
    image_type: str = "landscape"


class OpportunityCreate(OpportunityBase):
    pass


class OpportunityUpdate(BaseModel):
    """All fields optional so PUT can be used as a partial update."""
    title: Optional[str] = None
    type: Optional[OpportunityType] = None
    organization: Optional[str] = None
    location: Optional[str] = None
    mode: Optional[OpportunityMode] = None
    deadline: Optional[datetime] = None
    description: Optional[str] = None
    eligibility: Optional[str] = None
    skills: Optional[str] = None
    banner_image: Optional[str] = None
    banner_image_public_id: Optional[str] = None
    apply_link: Optional[str] = None
    status: Optional[OpportunityStatus] = None
    image_type: Optional[str] = None


class OpportunityOut(OpportunityBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
