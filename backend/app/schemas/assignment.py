from datetime import datetime

from pydantic import BaseModel, ConfigDict


class AssignmentCreate(BaseModel):
    questions: str
    deadline: datetime


class AssignmentOut(BaseModel):
    id: int
    application_id: int
    questions: str
    deadline: datetime
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
