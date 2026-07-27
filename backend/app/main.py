from fastapi import FastAPI

from app.database.database import Base, engine
from app.models.image import Image
from app.api.upload import router as upload_router
from app.api.caption import router as caption_router
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="VisionNarrator API",
    description="AI-powered Image Caption Generator and Semantic Search",
    version="1.0.0"
)
app.include_router(upload_router)
app.include_router(caption_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to VisionNarrator 🚀",
        "status": "Backend Running"
    }


@app.get("/health")
def health():
    return {
        "status": "Healthy"
    }