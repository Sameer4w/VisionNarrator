from fastapi import FastAPI

app = FastAPI(
    title="VisionNarrator API",
    description="AI-powered Image Caption Generator and Semantic Search",
    version="1.0.0"
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