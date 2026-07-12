"""
Opportunity routes: public read access, admin-only write access.
"""
from typing import List, Optional
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status, Form, File, UploadFile
from sqlalchemy.orm import Session

from app.api.deps import require_admin
from app.core.config import settings
from app.db.database import get_db
from app.models.opportunity import Opportunity
from app.schemas.opportunity import OpportunityOut
from app.utils.file_upload import save_upload_file, delete_upload_file

router = APIRouter()


@router.get("", response_model=List[OpportunityOut])
def list_opportunities(db: Session = Depends(get_db)):
    """Public: list all opportunities."""
    return db.query(Opportunity).order_by(Opportunity.deadline.desc()).all()


@router.get("/{opportunity_id}", response_model=OpportunityOut)
def get_opportunity(opportunity_id: int, db: Session = Depends(get_db)):
    """Public: get a single opportunity by id."""
    opportunity = db.query(Opportunity).filter(Opportunity.id == opportunity_id).first()
    if not opportunity:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Opportunity not found")
    return opportunity


@router.post("", response_model=OpportunityOut, status_code=status.HTTP_201_CREATED)
def create_opportunity(
    title: str = Form(...),
    organization: str = Form(...),
    type: str = Form(...),
    description: str = Form(...),
    deadline: datetime = Form(...),
    location: Optional[str] = Form(None),
    mode: Optional[str] = Form("Online"),
    apply_link: Optional[str] = Form(None),
    status_val: str = Form("Ongoing", alias="status"),
    image_type: str = Form("landscape"),
    banner_image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    _admin=Depends(require_admin),
):
    """Admin only: create a new opportunity (supports multipart/form-data for image upload)."""
    image_path = None
    image_pub_id = None
    if banner_image:
        image_path, image_pub_id = save_upload_file(banner_image, folder="internlex/opportunities")

    opportunity = Opportunity(
        title=title,
        organization=organization,
        type=type,
        description=description,
        deadline=deadline,
        location=location,
        mode=mode,
        apply_link=apply_link,
        status=status_val,
        image_type=image_type,
        banner_image=image_path,
        banner_image_public_id=image_pub_id,
    )
    db.add(opportunity)
    db.commit()
    db.refresh(opportunity)
    return opportunity


@router.put("/{opportunity_id}", response_model=OpportunityOut)
def update_opportunity(
    opportunity_id: int,
    title: Optional[str] = Form(None),
    organization: Optional[str] = Form(None),
    type: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    deadline: Optional[datetime] = Form(None),
    location: Optional[str] = Form(None),
    mode: Optional[str] = Form(None),
    apply_link: Optional[str] = Form(None),
    status_val: Optional[str] = Form(None, alias="status"),
    image_type: Optional[str] = Form(None),
    banner_image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    _admin=Depends(require_admin),
):
    """Admin only: partially update an opportunity."""
    opportunity = db.query(Opportunity).filter(Opportunity.id == opportunity_id).first()
    if not opportunity:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Opportunity not found")

    if title is not None:
        opportunity.title = title
    if organization is not None:
        opportunity.organization = organization
    if type is not None:
        opportunity.type = type
    if description is not None:
        opportunity.description = description
    if deadline is not None:
        opportunity.deadline = deadline
    if location is not None:
        opportunity.location = location
    if mode is not None:
        opportunity.mode = mode
    if apply_link is not None:
        opportunity.apply_link = apply_link
    if status_val is not None:
        opportunity.status = status_val
    if image_type is not None:
        opportunity.image_type = image_type
    if banner_image is not None:
        # Delete old banner image if it exists
        if opportunity.banner_image_public_id:
            delete_upload_file(opportunity.banner_image_public_id)
            
        image_path, image_pub_id = save_upload_file(banner_image, folder="internlex/opportunities")
        opportunity.banner_image = image_path
        opportunity.banner_image_public_id = image_pub_id

    db.commit()
    db.refresh(opportunity)
    return opportunity


@router.delete("/{opportunity_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_opportunity(
    opportunity_id: int,
    db: Session = Depends(get_db),
    _admin=Depends(require_admin),
):
    """Admin only: delete an opportunity."""
    opportunity = db.query(Opportunity).filter(Opportunity.id == opportunity_id).first()
    if not opportunity:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Opportunity not found")

    public_id = opportunity.banner_image_public_id
    
    try:
        if public_id:
            delete_upload_file(public_id)
            
        db.delete(opportunity)
        db.commit()
    except Exception as e:
        db.rollback()
        raise e
        
    return None
