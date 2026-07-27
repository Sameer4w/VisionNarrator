from sqlalchemy.orm import Session

from app.models.image import Image


def create_image(
    db: Session,
    filename: str,
    caption: str
):

    image = Image(
        filename=filename,
        caption=caption
    )

    db.add(image)

    db.commit()

    db.refresh(image)

    return image