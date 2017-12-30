import React from 'react';

function SearchResult(props) {
   const movie = props.movie;
   return (
      <div>
         <p>{movie.title} ({movie.year})</p>
      </div>
   );
}

export default SearchResult;