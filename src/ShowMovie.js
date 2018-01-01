import React from 'react';
import noImage from './no_image.png';

export const ShowMovie = ({movie}) => (
   <div className="ShowMovie">
      <a href={`http://www.imdb.com/title/${movie.imdbID}`}><img src={movie.Poster !== "N/A" ? movie.Poster : noImage} alt="Missing" height="200"/></a>
      <h4>{movie.Title}</h4>
      <p><b>Year</b>: {movie.Year}</p>
      <p><b>Type</b>: {movie.Type}</p>
      <p><b>Genre</b>: {movie.Genre}</p>
      <p><b>Plot</b>: {movie.Plot}</p>
      <p><b>Language</b>: {movie.Language}</p>
      <p><b>Actors</b>: {movie.Actors}</p>
      <p><b>IMdb Rating</b>: {movie.imdbRating}</p>
   </div>
);
