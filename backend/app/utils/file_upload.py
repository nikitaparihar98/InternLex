"""
Shared helper for saving uploaded files (resumes / assignment submissions)
to Cloudinary, with basic extension validation.
"""
import os
import uuid
import cloudinary
import cloudinary.uploader

from fastapi import HTTPException, UploadFile, status
from app.core.config import settings

# Configure Cloudinary globally
cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET,
    secure=True
)

ALLOWED_EXTENSIONS = {".pdf", ".doc", ".docx", ".png", ".jpg", ".jpeg", ".gif", ".webp"}

def _validate_extension(filename: str | None) -> str:
    if not filename:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No filename provided for uploaded file",
        )
    _, ext = os.path.splitext(filename)
    ext = ext.lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF, DOC, DOCX, and image files are allowed",
        )
    return ext

import logging

logger = logging.getLogger(__name__)

def save_upload_file(upload_file: UploadFile, folder: str) -> tuple[str, str]:
    """
    Validates the file extension, uploads the file buffer directly to Cloudinary,
    and returns a tuple of (secure_url, public_id).
    """
    if not upload_file or not upload_file.filename:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File upload is required",
        )

    ext = _validate_extension(upload_file.filename)
    
    # Read the file buffer
    file_content = upload_file.file.read()
    
    # Determine resource type
    # Cloudinary uses 'image' for images, 'raw' for documents like PDF/DOCX
    resource_type = "image"
    if ext in {".pdf", ".doc", ".docx"}:
        resource_type = "raw"
        
    try:
        # Upload directly from byte stream
        response = cloudinary.uploader.upload(
            file_content,
            resource_type=resource_type,
            folder=folder,
        )
        secure_url = response.get("secure_url")
        public_id = response.get("public_id")
        if not secure_url or not public_id:
            raise ValueError("Cloudinary response missing secure_url or public_id")
        
        logger.info(f"Successfully uploaded asset to Cloudinary: folder={folder}, public_id={public_id}")
        return secure_url, public_id
    except Exception as e:
        logger.error(f"Cloudinary Upload Error: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to upload file to cloud storage.",
        )

def delete_upload_file(public_id: str, is_raw: bool = False) -> bool:
    """
    Deletes an asset from Cloudinary using its public_id.
    Returns True if deleted or already gone, False if failed.
    Does not crash the caller so database deletions are not blocked.
    """
    if not public_id:
        logger.warning("Attempted to delete asset from Cloudinary with empty public_id")
        return False
        
    if not settings.CLOUDINARY_CLOUD_NAME:
        logger.warning(f"Cloudinary is not configured; skipping deletion for public_id={public_id}")
        return False

    resource_type = "raw" if is_raw else "image"
    try:
        response = cloudinary.uploader.destroy(public_id, resource_type=resource_type)
        result = response.get("result")
        if result == "ok":
            logger.info(f"Successfully deleted asset from Cloudinary: public_id={public_id}, type={resource_type}")
            return True
        elif result == "not found":
            logger.warning(f"Asset not found in Cloudinary: public_id={public_id}")
            return True
        else:
            logger.warning(f"Cloudinary delete returned unexpected result: {result} for public_id={public_id}")
            return False
    except Exception as e:
        logger.warning(f"Cloudinary Delete Exception for public_id={public_id}: {e}")
        return False
