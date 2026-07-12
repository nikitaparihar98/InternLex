"""
Article routes: public read access, admin-only write access.
"""
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, status, Form, File, UploadFile
from sqlalchemy.orm import Session

from app.api.deps import require_admin
from app.core.config import settings
from app.db.database import get_db
from datetime import datetime
from app.models.article import Article, ArticleStatus
from app.schemas.article import ArticleOut
from app.utils.file_upload import save_upload_file, delete_upload_file

router = APIRouter()


from sqlalchemy import nulls_last

@router.get("", response_model=List[ArticleOut])
def list_articles(db: Session = Depends(get_db)):
    """Public: list all articles."""
    # Ensure sorted by publication_date descending (or created_at if null)
    return db.query(Article).order_by(nulls_last(Article.publication_date.desc()), Article.created_at.desc()).all()


@router.get("/{article_id}", response_model=ArticleOut)
def get_article(article_id: int, db: Session = Depends(get_db)):
    """Public: get a single article by id."""
    article = db.query(Article).filter(Article.id == article_id).first()
    if not article:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Article not found")
    return article


@router.post("", response_model=ArticleOut, status_code=status.HTTP_201_CREATED)
def create_article(
    title: str = Form(...),
    publication_date: Optional[datetime] = Form(None),
    description: Optional[str] = Form(""),
    content: str = Form(...),
    author: Optional[str] = Form(None),
    status_val: ArticleStatus = Form(ArticleStatus.Draft, alias="status"),
    image_type: str = Form("landscape"),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    _admin=Depends(require_admin),
):
    """Admin only: create a new article (supports multipart/form-data for image upload)."""
    image_path = None
    image_pub_id = None
    if image:
        image_path, image_pub_id = save_upload_file(image, folder="internlex/articles")

    article = Article(
        title=title,
        publication_date=publication_date,
        description=description,
        content=content,
        author=author,
        status=status_val,
        image_type=image_type,
        image=image_path,
        image_public_id=image_pub_id,
    )
    db.add(article)
    db.commit()
    db.refresh(article)
    return article


@router.put("/{article_id}", response_model=ArticleOut)
def update_article(
    article_id: int,
    title: Optional[str] = Form(None),
    publication_date: Optional[datetime] = Form(None),
    description: Optional[str] = Form(None),
    content: Optional[str] = Form(None),
    author: Optional[str] = Form(None),
    status_val: Optional[ArticleStatus] = Form(None, alias="status"),
    image_type: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    _admin=Depends(require_admin),
):
    """Admin only: partially update an article."""
    article = db.query(Article).filter(Article.id == article_id).first()
    if not article:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Article not found")

    if title is not None:
        article.title = title
    if publication_date is not None:
        article.publication_date = publication_date
    if description is not None:
        article.description = description
    if content is not None:
        article.content = content
    if author is not None:
        article.author = author
    if status_val is not None:
        article.status = status_val
    if image_type is not None:
        article.image_type = image_type
    if image is not None:
        # Delete old image first if it exists
        if article.image_public_id:
            delete_upload_file(article.image_public_id)
        
        image_path, image_pub_id = save_upload_file(image, folder="internlex/articles")
        article.image = image_path
        article.image_public_id = image_pub_id

    db.commit()
    db.refresh(article)
    return article


@router.delete("/{article_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_article(
    article_id: int,
    db: Session = Depends(get_db),
    _admin=Depends(require_admin),
):
    """Admin only: delete an article."""
    article = db.query(Article).filter(Article.id == article_id).first()
    if not article:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Article not found")

    # Store public_id in memory for deletion after Cloudinary check
    public_id = article.image_public_id
    
    try:
        if public_id:
            delete_upload_file(public_id)
            
        db.delete(article)
        db.commit()
    except Exception as e:
        db.rollback()
        raise e
        
    return None
