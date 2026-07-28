from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.database.database import Base

class Image(Base):
    __tablename__ = "images"

    id = Column(Integer, primary_key=True, index=True)

    filename = Column(String, nullable=False)

    caption = Column(String, nullable=False)

    embedding = Column(String, nullable=True)   # NEW

    uploaded_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )