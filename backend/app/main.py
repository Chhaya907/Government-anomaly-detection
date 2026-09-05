from fastapi import FastAPI

app = FastAPI(
    title="Government Anomaly Detection API",
    version="1.0.0"
)

@app.get("/")
def root():
    return {"message": "Government Anomaly Detection API is running"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
