from fastapi import FastAPI

from app.routers.auth import router as auth_router

app = FastAPI(
    title="Government Anomaly Detection API",
    version="1.0.0"
)

app.include_router(auth_router, prefix="/api/v1")


@app.get("/")
def root():
    return {"message": "Government Anomaly Detection API is running"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}
