from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class SubmissionOut(BaseModel):
    id: int
    assignment_id: int
    student_id: int
    answer_file: str
    answer_file_public_id: Optional[str] = None
    submitted_at: datetime

    model_config = ConfigDict(from_attributes=True)
