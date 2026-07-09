"""
Case summary routes: public read access, admin-only write access.
"""
from typing import List, Optional
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status, Form, File, UploadFile
from sqlalchemy.orm import Session

from app.api.deps import require_admin
from app.core.config import settings
from app.db.database import get_db
from app.models.case_summary import CaseSummary, CaseSummaryStatus
from app.schemas.case_summary import CaseSummaryOut
from app.utils.file_upload import save_upload_file, delete_upload_file

router = APIRouter()


from sqlalchemy import nulls_last

@router.get("", response_model=List[CaseSummaryOut])
def list_case_summaries(db: Session = Depends(get_db)):
    """Public: list all case summaries."""
    # Ensure sorted by publication_date descending (or created_at if null)
    return db.query(CaseSummary).order_by(nulls_last(CaseSummary.publication_date.desc()), CaseSummary.created_at.desc()).all()


@router.get("/{case_summary_id}", response_model=CaseSummaryOut)
def get_case_summary(case_summary_id: int, db: Session = Depends(get_db)):
    """Public: get a single case summary by id."""
    case_summary = db.query(CaseSummary).filter(CaseSummary.id == case_summary_id).first()
    if not case_summary:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Case summary not found")
    return case_summary


@router.post("", response_model=CaseSummaryOut, status_code=status.HTTP_201_CREATED)
def create_case_summary(
    title: str = Form(...),
    court: str = Form(...),
    category: str = Form(...),
    facts: str = Form(...),
    issues: str = Form(...),
    judgment: str = Form(...),
    legal_principle: str = Form(...),
    description: str = Form(...),
    author: Optional[str] = Form(None),
    publication_date: Optional[datetime] = Form(None),
    status_val: CaseSummaryStatus = Form(CaseSummaryStatus.Draft, alias="status"),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    _admin=Depends(require_admin),
):
    """Admin only: create a new case summary."""
    image_path = None
    image_pub_id = None
    if image:
        image_path, image_pub_id = save_upload_file(image, folder="internlex/case-commentaries")

    case_summary = CaseSummary(
        title=title,
        court=court,
        category=category,
        facts=facts,
        issues=issues,
        judgment=judgment,
        legal_principle=legal_principle,
        description=description,
        author=author,
        publication_date=publication_date,
        status=status_val,
        image=image_path,
        image_public_id=image_pub_id,
    )
    db.add(case_summary)
    db.commit()
    db.refresh(case_summary)
    return case_summary


@router.put("/{case_summary_id}", response_model=CaseSummaryOut)
def update_case_summary(
    case_summary_id: int,
    title: Optional[str] = Form(None),
    court: Optional[str] = Form(None),
    category: Optional[str] = Form(None),
    facts: Optional[str] = Form(None),
    issues: Optional[str] = Form(None),
    judgment: Optional[str] = Form(None),
    legal_principle: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    author: Optional[str] = Form(None),
    publication_date: Optional[datetime] = Form(None),
    status_val: Optional[CaseSummaryStatus] = Form(None, alias="status"),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    _admin=Depends(require_admin),
):
    """Admin only: partially update a case summary."""
    case_summary = db.query(CaseSummary).filter(CaseSummary.id == case_summary_id).first()
    if not case_summary:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Case summary not found")

    if title is not None:
        case_summary.title = title
    if court is not None:
        case_summary.court = court
    if category is not None:
        case_summary.category = category
    if facts is not None:
        case_summary.facts = facts
    if issues is not None:
        case_summary.issues = issues
    if judgment is not None:
        case_summary.judgment = judgment
    if legal_principle is not None:
        case_summary.legal_principle = legal_principle
    if description is not None:
        case_summary.description = description
    if author is not None:
        case_summary.author = author
    if publication_date is not None:
        case_summary.publication_date = publication_date
    if status_val is not None:
        case_summary.status = status_val
    if image is not None:
        # Delete old image first if it exists
        if case_summary.image_public_id:
            delete_upload_file(case_summary.image_public_id)
            
        image_path, image_pub_id = save_upload_file(image, folder="internlex/case-commentaries")
        case_summary.image = image_path
        case_summary.image_public_id = image_pub_id

    db.commit()
    db.refresh(case_summary)
    return case_summary


@router.delete("/{case_summary_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_case_summary(
    case_summary_id: int,
    db: Session = Depends(get_db),
    _admin=Depends(require_admin),
):
    """Admin only: delete a case summary."""
    case_summary = db.query(CaseSummary).filter(CaseSummary.id == case_summary_id).first()
    if not case_summary:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Case summary not found")

    public_id = case_summary.image_public_id
    
    try:
        if public_id:
            delete_upload_file(public_id)
            
        db.delete(case_summary)
        db.commit()
    except Exception as e:
        db.rollback()
        raise e
        
    return None
