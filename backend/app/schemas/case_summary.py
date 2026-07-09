from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict

from app.models.case_summary import CaseSummaryStatus


class CaseSummaryBase(BaseModel):
    title: str
    court: str
    category: str
    facts: str
    issues: str
    judgment: str
    legal_principle: str
    description: str
    author: Optional[str] = None
    publication_date: Optional[datetime] = None
    image: Optional[str] = None
    image_public_id: Optional[str] = None
    status: CaseSummaryStatus = CaseSummaryStatus.Draft


class CaseSummaryCreate(CaseSummaryBase):
    pass


class CaseSummaryUpdate(BaseModel):
    title: Optional[str] = None
    court: Optional[str] = None
    category: Optional[str] = None
    facts: Optional[str] = None
    issues: Optional[str] = None
    judgment: Optional[str] = None
    legal_principle: Optional[str] = None
    description: Optional[str] = None
    author: Optional[str] = None
    publication_date: Optional[datetime] = None
    image: Optional[str] = None
    image_public_id: Optional[str] = None
    status: Optional[CaseSummaryStatus] = None


class CaseSummaryOut(CaseSummaryBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
