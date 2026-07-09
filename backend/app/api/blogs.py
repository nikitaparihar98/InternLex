"""
Blog routes: public read access, admin-only write access.
"""
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, status, Form, File, UploadFile
from sqlalchemy.orm import Session

from app.api.deps import require_admin
from app.core.config import settings
from app.db.database import get_db
from datetime import datetime
from app.models.blog import Blog, BlogStatus
from app.schemas.blog import BlogOut
from app.utils.file_upload import save_upload_file, delete_upload_file

router = APIRouter()


from sqlalchemy import nulls_last

@router.get("", response_model=List[BlogOut])
def list_blogs(db: Session = Depends(get_db)):
    """Public: list all blogs."""
    # Ensure sorted by publication_date descending (or created_at if null)
    return db.query(Blog).order_by(nulls_last(Blog.publication_date.desc()), Blog.created_at.desc()).all()


@router.get("/{blog_id}", response_model=BlogOut)
def get_blog(blog_id: int, db: Session = Depends(get_db)):
    """Public: get a single blog by id."""
    blog = db.query(Blog).filter(Blog.id == blog_id).first()
    if not blog:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Blog not found")
    return blog


@router.post("", response_model=BlogOut, status_code=status.HTTP_201_CREATED)
def create_blog(
    title: str = Form(...),
    publication_date: Optional[datetime] = Form(None),
    description: str = Form(...),
    content: str = Form(...),
    author: Optional[str] = Form(None),
    status_val: BlogStatus = Form(BlogStatus.Draft, alias="status"),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    _admin=Depends(require_admin),
):
    """Admin only: create a new blog."""
    image_path = None
    image_pub_id = None
    if image:
        image_path, image_pub_id = save_upload_file(image, folder="internlex/blogs")

    blog = Blog(
        title=title,
        publication_date=publication_date,
        description=description,
        content=content,
        author=author,
        status=status_val,
        image=image_path,
        image_public_id=image_pub_id,
    )
    db.add(blog)
    db.commit()
    db.refresh(blog)
    return blog


@router.put("/{blog_id}", response_model=BlogOut)
def update_blog(
    blog_id: int,
    title: Optional[str] = Form(None),
    publication_date: Optional[datetime] = Form(None),
    description: Optional[str] = Form(None),
    content: Optional[str] = Form(None),
    author: Optional[str] = Form(None),
    status_val: Optional[BlogStatus] = Form(None, alias="status"),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    _admin=Depends(require_admin),
):
    """Admin only: partially update a blog."""
    blog = db.query(Blog).filter(Blog.id == blog_id).first()
    if not blog:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Blog not found")

    if title is not None:
        blog.title = title
    if publication_date is not None:
        blog.publication_date = publication_date
    if description is not None:
        blog.description = description
    if content is not None:
        blog.content = content
    if author is not None:
        blog.author = author
    if status_val is not None:
        blog.status = status_val
    if image is not None:
        # Delete old image first if it exists
        if blog.image_public_id:
            delete_upload_file(blog.image_public_id)
            
        image_path, image_pub_id = save_upload_file(image, folder="internlex/blogs")
        blog.image = image_path
        blog.image_public_id = image_pub_id

    db.commit()
    db.refresh(blog)
    return blog


@router.delete("/{blog_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_blog(
    blog_id: int,
    db: Session = Depends(get_db),
    _admin=Depends(require_admin),
):
    """Admin only: delete a blog."""
    blog = db.query(Blog).filter(Blog.id == blog_id).first()
    if not blog:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Blog not found")

    public_id = blog.image_public_id
    
    try:
        if public_id:
            delete_upload_file(public_id)
            
        db.delete(blog)
        db.commit()
    except Exception as e:
        db.rollback()
        raise e
        
    return None
