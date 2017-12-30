import React from 'react';

function SearchResult(props) {
   const movie = props.movie;
   return (
         <p key={movie.imdbID}>{movie.title} ({movie.year})</p>
   );
}

export default SearchResult;