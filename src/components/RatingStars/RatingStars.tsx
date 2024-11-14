import React from 'react';

type RatingStarsProps = {
  rating: number;
};

export default function RatingStars({ rating }: RatingStarsProps) {
  return (
    <div style={{ display: 'flex' }}>
      {[...Array(5)].map((_, index) => (
        <span key={index} style={{ color: index < rating ? '#FFD700' : '#e4e5e9' }}>
          ★
        </span>
      ))}
      <span style={{ marginLeft: '5px' }}>{rating}</span>
    </div>
  );
}
