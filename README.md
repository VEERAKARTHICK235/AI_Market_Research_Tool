# AI-Driven Market Research Tool 🤖

This project is a powerful tool designed to analyze **product reviews and images** to identify **consumer sentiment** and **emerging trends**. It leverages **Natural Language Processing (NLP)** for textual insights and **Computer Vision** for image classification, all accessible via an intuitive web interface.

---

## ✨ Features

- **Sentiment Analysis**: Classifies user reviews as `POSITIVE`, `NEGATIVE`, or `NEUTRAL` using a robust transformer-based model.
- **Keyword Extraction**: Highlights the most relevant phrases and topics discussed in the reviews.
- **Image Classification**: Users can upload product images, and the tool will recognize and categorize them.
- **Modern Web UI**: Clean, responsive frontend built with React.js.
- **High-Performance API**: Backend powered by FastAPI for rapid inference and seamless integration.

---

## 🛠️ Tech Stack

- **Backend**: Python, FastAPI, Hugging Face Transformers, PyTorch, Scikit-learn, Pillow  
- **Frontend**: React.js, Axios, CSS Modules  

### 🔍 Core AI Models

- `cardiffnlp/twitter-roberta-base-sentiment-latest` – for Sentiment Analysis  
- `google/vit-base-patch16-224` – for Image Classification  

---

## 🧪 Running the Application

1. Start the Backend Server

python -m uvicorn app.main:app --reload


2. Start the Frontend Server

npm start


## 💡 How to Use

Open the frontend app in your browser.

Paste product reviews into the text box (one per line).

Optionally upload a product image.

Click “Analyze Text & Image”.

View sentiment breakdown, top keywords, and image classification.


## 🔮 Future Improvements

Fine-Tuning: Adapt sentiment and vision models for specific domains.

Database Integration: Store and analyze historical review data.

Multi-Source Input: Scrape content from Twitter/X, Reddit, and news APIs.

Aspect-Based Sentiment Analysis (ABSA): Understand sentiment per feature (e.g., "camera", "battery").

