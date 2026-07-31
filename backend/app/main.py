from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.database.database import Base, engine
from app.api.caption import router as caption_router
from app.api.images import router as images_router
from app.api.search import router as search_router
from app.models.dashboard import DashboardStats
from app.api.dashboard import router as dashboard_router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="VisionNarrator API",
    description="AI-powered Image Caption Generator and Semantic Search",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://your-vercel-app.vercel.app",
    ],
        allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(caption_router)
app.include_router(images_router)
app.include_router(search_router)
app.include_router(dashboard_router)

# Static Files
app.mount(
    "/uploads",
    StaticFiles(directory="app/uploads"),
    name="uploads"
)

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