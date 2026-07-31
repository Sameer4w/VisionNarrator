from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import os

from app.database.dependencies import get_db
from app.crud.image_crud import (
    delete_image,
    get_all_images,
    get_image_by_id
)

router = APIRouter(
    prefix="/images",
    tags=["Images"]
)


@router.get("/")
def read_images(
    db: Session = Depends(get_db)
):
    """
    Return all uploaded images.
    """
    return get_all_images(db)


@router.get("/{image_id}")
def read_image(
    image_id: int,
    db: Session = Depends(get_db)
):
    """
    Return a single image by ID.
    """

    image = get_image_by_id(
        db,
        image_id
    )

    if image is None:
        raise HTTPException(
            status_code=404,
            detail="Image not found"
        )

    return image


@router.delete("/{image_id}")
def remove_image(
    image_id: int,
    db: Session = Depends(get_db)
):
    """
    Delete an image from both the database and uploads folder.
    """

    image = get_image_by_id(
        db,
        image_id
    )

    if image is None:
        raise HTTPException(
            status_code=404,
            detail="Image not found"
        )

    file_path = os.path.join(
        "app",
        "uploads",
        image.filename
    )

    if os.path.exists(file_path):
        os.remove(file_path)

    delete_image(
        db,
        image
    )

    return {
        "message": "Image deleted successfully"
    }