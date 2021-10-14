import React from 'react';

export default function Image({ imagePath, alt = 'Book Image' }) {
  return (
    <>
      <img
        style={{ objectFit: 'cover', width: '100%' }}
        src={`${imagePath}`}
        srcSet={`${imagePath}`}
        alt={alt}
        loading="lazy"
      />
    </>
  );
}
