import React, {Component} from 'react';
import logo from './movie.png';
import './App.css';
import {SearchResult} from "./SearchResult";
import {SearchForm} from "./SearchForm";
import {ShowMovie} from "./ShowMovie";

class App extends Component {

   constructor(props) {
      super(props);

      this.checkOmdbApiKey();

      this.state = {
         searchedMoviesJson: '',
         movieJson: '',
      };
   }

   checkOmdbApiKey() {
      if (process.env.REACT_APP_SECRET_OMDB_API_KEY === undefined) {
         alert("Missing environment variable REACT_APP_SECRET_OMDB_API_KEY");
      }
   }

   componentDidMount() {
      this.searchMovies({
         title: "top+secret",
      });
   }

   handleSearchMovieSubmit(params) {
      console.log("params = ", params);
      console.log("params.title = ", params.title);
      console.log("params.year = ", params.year);

      this.searchMovies(params);
   }

   showMovie(omdbID) {
      this.fetchMovie(omdbID);
   }

   async fetchMovie(omdbID) {
      console.log("omdbID = ", omdbID);

      try {
         const response = await fetch(`http://www.omdbapi.com/?apiKey=${process.env.REACT_APP_SECRET_OMDB_API_KEY}&i=${omdbID}`);
         const json = await response.json();
         console.log("json: ", json);
         this.setState({
            movieJson: json,
            searchedMoviesJson: ''
         })
      } catch (error) {
         console.error("Error fetching movie info: ", error)
      }
   }

   async searchMovies(params) {
      const {title, year} = params;

      console.log("title: ", title);
      console.log("year: ", year);
      try {
         const response = await fetch(`http://www.omdbapi.com/?apiKey=${process.env.REACT_APP_SECRET_OMDB_API_KEY}&s=${title}` + (year !== undefined ? `&y=${year}` : ''));
         const json = await response.json();
         console.log("json: ", json);
         this.setState({
            searchedMoviesJson: json,
            movieJson: '',
         })
      } catch (error) {
         console.error("Error searching for movies: ", error)
      }
   }

   render() {
      console.log("this.state.searchedMoviesJson: ", this.state.searchedMoviesJson);

      console.log("this.state.searchedMoviesJson.Response = " + this.state.searchedMoviesJson.Response);

      let movies = [];
      if (this.state.searchedMoviesJson.Response === "True") {
         movies = this.state.searchedMoviesJson.Search.map(movie => (
            {
               title: `${movie.Title}`,
               year: `${movie.Year}`,
               imdbID: `${movie.imdbID}`,
               type: `${movie.Type}`,
               poster: `${movie.Poster}`,
            }
         ));
         movies.sort((m1, m2) => m1.year < m2.year);
      }

      const movie = this.state.movieJson.Response === "True" ? this.state.movieJson : null;

      console.log("movies", movies);
      const listItems = movies.map((movie) => <SearchResult key={movie.imdbID} movie={movie}
                                                            handleClick={this.showMovie.bind(this)}/>);
      return (
         <div className="App">
            <header className="App-header">
               <img src={logo} className="App-logo" alt="logo"/>
               <h1 className="App-title">Movie search</h1>
            </header>
            <SearchForm
               onSubmit={this.handleSearchMovieSubmit.bind(this)}
            />
            {
               movie && <ShowMovie movie={movie} />
            }
            {
               this.state.searchedMoviesJson !== '' && this.state.searchedMoviesJson.Response !== "True" && <div>No movies found</div>
            }
            {
               this.state.searchedMoviesJson !== '' ?
                  <div>
                     {listItems}
                  </div>
                  : ''
            }
         </div>
      );
   }

}

export default App;
