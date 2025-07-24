from transformers import pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd
from PIL import Image
import io

# --- Initialize Models (Load only once on startup) ---
# Text model
try:
    SENTIMENT_PIPELINE = pipeline(
        "sentiment-analysis", 
        model="cardiffnlp/twitter-roberta-base-sentiment-latest"
    )
except Exception as e:
    print(f"Error loading sentiment model: {e}")
    SENTIMENT_PIPELINE = None

# NEW: Image model for classifying what's in the picture
try:
    IMAGE_PIPELINE = pipeline(
        "image-classification", 
        model="google/vit-base-patch16-224"
    )
except Exception as e:
    print(f"Error loading image model: {e}")
    IMAGE_PIPELINE = None

def analyze_product_image(image_file: bytes):
    """
    Analyzes an image file to classify its content.
    """
    if not IMAGE_PIPELINE:
        raise RuntimeError("Image classification model is not available.")
    
    # Convert image bytes to a PIL Image
    image = Image.open(io.BytesIO(image_file))
    
    # Get predictions
    predictions = IMAGE_PIPELINE(image)
    
    # Format the predictions for the report
    formatted_predictions = [{"object": p['label'], "confidence": round(p['score'], 2)} for p in predictions]
    return formatted_predictions[:5] # Return top 5 predictions


def perform_analysis(reviews: list[str], image_file: bytes = None):
    """
    Analyzes product reviews and optionally an image.
    """
    if not SENTIMENT_PIPELINE:
        raise RuntimeError("Sentiment analysis model is not available.")

    # --- Text Analysis ---
    sentiments = SENTIMENT_PIPELINE(reviews)
    tfidf_vectorizer = TfidfVectorizer(stop_words="english", ngram_range=(1, 2), max_features=15)
    tfidf_vectorizer.fit_transform(reviews)
    keywords = tfidf_vectorizer.get_feature_names_out()
    
    df = pd.DataFrame({
        'review': reviews,
        'sentiment': [s['label'].upper() for s in sentiments],
        'sentiment_score': [round(s['score'], 2) for s in sentiments]
    })
    
    sentiment_summary = df['sentiment'].value_counts(normalize=True).mul(100).round(1).to_dict()

    # --- Combine Reports ---
    report = {
        "text_analysis": {
            "overall_summary": {
                "total_reviews_analyzed": len(reviews),
                "sentiment_distribution_percent": sentiment_summary
            },
            "top_keywords": list(keywords),
            "detailed_analysis": df.to_dict('records')
        }
    }

    # --- Image Analysis (if image is provided) ---
    if image_file:
        try:
            image_report = analyze_product_image(image_file)
            report["image_analysis"] = image_report
        except Exception as e:
            report["image_analysis"] = {"error": str(e)}
            
    return report