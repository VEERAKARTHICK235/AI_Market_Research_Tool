import React from 'react';
import './ReportDisplay.css';

const ReportDisplay = ({ report }) => {
  if (!report) return null;

  const { text_analysis, image_analysis } = report;

  return (
    <div className="report-container">
      {/* Text Analysis Section */}
      {text_analysis && (
        <div className="analysis-section">
          <h2>Text Analysis Report</h2>
          <div className="summary-card">
            <h3>Overall Sentiment</h3>
            <p><strong>Total Reviews Analyzed:</strong> {text_analysis.overall_summary.total_reviews_analyzed}</p>
            <ul>
              {Object.entries(text_analysis.overall_summary.sentiment_distribution_percent).map(([sentiment, percentage]) => (
                <li key={sentiment}>
                  <span className={`sentiment-${sentiment.toLowerCase()}`}>{sentiment}:</span> {percentage}%
                </li>
              ))}
            </ul>
          </div>
          <div className="keywords-card">
            <h3>Top Keywords</h3>
            <div className="keywords-list">
              {text_analysis.top_keywords.map(keyword => <span key={keyword} className="keyword-tag">{keyword}</span>)}
            </div>
          </div>
          <div className="details-card">
            <h3>Detailed Review Breakdown</h3>
            <table>
              <thead>
                <tr>
                  <th>Review</th>
                  <th>Detected Sentiment</th>
                </tr>
              </thead>
              <tbody>
                {text_analysis.detailed_analysis.map((item, index) => (
                  <tr key={index}>
                    <td>{item.review}</td>
                    <td className={`sentiment-${item.sentiment.toLowerCase()}`}>{item.sentiment} ({item.sentiment_score})</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Image Analysis Section */}
      {image_analysis && (
        <div className="analysis-section">
          <h2>Image Analysis Report</h2>
          <div className="details-card">
            <h3>Objects Detected</h3>
            <table>
              <thead>
                <tr>
                  <th>Object</th>
                  <th>Confidence</th>
                </tr>
              </thead>
              <tbody>
                {image_analysis.map((item, index) => (
                  <tr key={index}>
                    <td>{item.object}</td>
                    <td>{(item.confidence * 100).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportDisplay;