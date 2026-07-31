from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.crud.dashboard_crud import get_dashboard
from app.crud.image_crud import get_all_images

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/")
def dashboard(db: Session = Depends(get_db)):

    stats = get_dashboard(db)

    images = get_all_images(db)

    return {

        "images_uploaded": len(images),

        "ai_captions": len(images),

        "semantic_searches": stats.semantic_searches,

        "duplicates_prevented": stats.duplicates_prevented

    }