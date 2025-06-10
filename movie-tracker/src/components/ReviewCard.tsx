import React from 'react';

interface ReviewCardProps {
  posterPath: string;
  movieTitle: string;
  rating: number;
  reviewText: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  posterPath,
  movieTitle,
  rating,
  reviewText
}) => {
  return (
    <div className="review-card">
      <div className="poster-container">
        <img src={posterPath} alt={`${movieTitle} poster`} className="movie-poster" />
      </div>
      <div className="review-content">
        <h3 className="movie-title">{movieTitle}</h3>
        <div className="rating">
          <span className="rating-value">{rating}/10</span>
        </div>
        <p className="review-text">{reviewText}</p>
      </div>
    </div>
  );
};

export default ReviewCard; 