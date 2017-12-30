import React from 'react';

export const SearchForm = ({onInputSearchMovieChange, onSubmit}) => (
   <div className="SearchForm">
      <form onSubmit={onSubmit}>
          <label>Title</label>&nbsp;
          <input type="text"
              id='searchMovie'
              placeholder="Title of movie..."
              size="40"
              onChange={onInputSearchMovieChange}
          />
          <input type="submit" value="Search" />
      </form>
   </div>
);
