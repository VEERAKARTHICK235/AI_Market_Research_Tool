import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import ReportDisplay from './components/ReportDisplay';

const API_URL = 'http://localhost:8000/api/analyze';

function App() {
  const [text, setText] = useState("The camera is stunning!\nBut the battery life is a big disappointment.");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleAnalyzeClick = async () => {
    const reviews = text.split('\n').filter(line => line.trim() !== '');
    
    if (reviews.length === 0) {
      setError('Please enter at least one review.');
      return;
    }

    setLoading(true);
    setError('');
    setReport(null);

    // Use FormData to send both text and image file
    const formData = new FormData();
    formData.append('reviews_text', JSON.stringify(reviews));
    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setReport(response.data);
    } catch (err) {
      setError('Failed to connect to the analysis server. Is it running?');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>AI Market Research Tool 🤖</h1>
      <p>Enter product reviews, with each review on a new line.</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter reviews here..."
      />
      
      <div className="file-upload">
        <label htmlFor="image-upload">Upload Product Image (Optional)</label>
        <input id="image-upload" type="file" accept="image/*" onChange={handleFileChange} />
      </div>

      <button onClick={handleAnalyzeClick} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze Text & Image'}
      </button>

      {error && <div className="error">{error}</div>}

      <div className="results-container">
        {report && <ReportDisplay report={report} />}
      </div>
    </div>
  );
}

export default App;