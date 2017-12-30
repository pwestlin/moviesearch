import React from 'react';
import noImage from './no_image.png';

export const SearchResult = ({movie}) => (
   <div className="SearchResult">
      <h4>{movie.title}</h4>
      <p><b>Year</b>: {movie.year}</p>
      <p><b>Type</b>: {movie.type}</p>
      <img src={movie.poster !== "N/A" ? movie.poster : noImage} alt="Missing" height="100"/>
   </div>
);
