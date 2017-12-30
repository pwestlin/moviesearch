import React from 'react';
import noImage from './no_image.png';

export const SearchResult = ({movie}) => (
   <div className="SearchResult">
      <h4>Title: {movie.title} ({movie.year})</h4>
      <img src={movie.poster !== "N/A" ? movie.poster : noImage} alt="Missing" height="100"/>
   </div>
);
