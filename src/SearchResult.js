import React from 'react';
import noImage from './no_image.png';

function SearchResult(props) {
   const movie = props.movie;
   return (
      <div className="SearchResult">
         <h4>Title: {movie.title} ({movie.year})</h4>
         <img src={movie.poster !== "N/A" ? movie.poster : noImage} alt="No image" height="100"/>
      </div>
   );
}

export default SearchResult;