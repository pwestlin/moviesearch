import React, {Component} from 'react';
import logo from './movie.png';
import './App.css';
import {SearchResult} from "./SearchResult";
import {SearchForm} from "./SearchForm";

class App extends Component {

   constructor(props) {
      super(props);

      this.checkOmdbApiKey();

      this.state = {
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

   async searchMovies(params) {
      const {title, year} = params;

      console.log("title: ", title);
      console.log("year: ", year);
      try {
         const response = await fetch(`http://www.omdbapi.com/?apiKey=${process.env.REACT_APP_SECRET_OMDB_API_KEY}&s=${title}` + (year !== undefined ? `&y=${year}` : ''));
         const json = await response.json();
         console.log("json: ", json);
         this.setState({
            movieJson: json
         })
      } catch (error) {
         console.error("Fel vid hätmtning av film: ", error)
      }
   }

   render() {
      console.log("this.state.movieJson: ", this.state.movieJson);

      console.log("this.state.movieJson.Response = " + this.state.movieJson.Response);

      let movies = [];
      if(this.state.movieJson.Response === "True") {
         movies = this.state.movieJson.Search.map(movie => (
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

      console.log("movies", movies);
      const listItems = movies.map((movie) => <SearchResult key={movie.imdbID} movie={movie}/>);
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
               this.state.movieJson.Response !== "True" && <div>No movies found</div>
            }
            {
               this.state.movieJson !== '' ?
                  <div>
                     {listItems}
                  </div>
                  :
                  <p className="App-intro">
                     Ingen film
                  </p>
            }
         </div>
      );
   }

}

export default App;
