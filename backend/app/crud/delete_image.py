from sqlalchemy.orm import Session
from app.models.image import Image

def delete_image(db: Session, image_id: int):
    image = db.query(Image).filter(Image.id == image_id).first()

    if not image:
        return None

    db.delete(image)
    db.commit()

    return image