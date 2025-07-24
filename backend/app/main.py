from fastapi import FastAPI, HTTPException, File, UploadFile, Form
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware
import json

# Import your analysis function
from .analysis import perform_analysis

app = FastAPI()

# --- CORS Middleware ---
origins = [
    "http://localhost:3000",
    "http://localhost:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api")
def read_root():
    return {"message": "AI Market Research API is running."}


@app.post("/api/analyze")
async def analyze_reviews(
    reviews_text: str = Form(...), 
    image: Optional[UploadFile] = File(None)
):
    """
    Accepts a list of reviews (as a JSON string) and an optional image file.
    """
    try:
        reviews = json.loads(reviews_text)
        image_bytes = await image.read() if image else None
        
        # The core logic is now in a separate module
        report = perform_analysis(reviews=reviews, image_file=image_bytes)
        return report
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON format for reviews_text.")
    except Exception as e:
        # Catch any other unexpected errors
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")