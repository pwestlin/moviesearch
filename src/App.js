import React, {Component} from 'react';
import logo from './movie.png';
import './App.css';
import SearchResult from "./SearchResult";

class App extends Component {

   constructor(props) {
      super(props);

      this.checkOmdbApiKey();

      this.state = {
         movieJson: '',
         omdbApiKey: process.env.REACT_APP_SECRET_OMDB_API_KEY
      };
   }

   checkOmdbApiKey() {
      console.log("omdbApiKey:", process.env.REACT_APP_SECRET_OMDB_API_KEY);
      if (process.env.REACT_APP_SECRET_OMDB_API_KEY === undefined) {
         alert("You must set environment variable REACT_APP_SECRET_OMDB_API_KEY");
      }
   }


   componentDidMount() {
      console.log("componentDidMount");
      this.fetchMovie();
   }

   async fetchMovie() {
      try {
         //const response = await fetch(`http://www.omdbapi.com/?apiKey=${process.env.REACT_APP_SECRET_OMDB_API_KEY}&t=top+secret&y=1984`);
         const response = await fetch(`http://www.omdbapi.com/?apiKey=${this.state.omdbApiKey}&s=top+secret`);
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
      const movies = this.state.movieJson !== '' ? this.state.movieJson.Search.map(movie => (
         {
            title: `${movie.Title}`,
            year: `${movie.Year}`,
            imdbID: `${movie.imdbID}`,
            type: `${movie.Type}`,
            poster: `${movie.Poster}`,
         }
      )) : [];
      console.log("movies", movies);
      //const listItems = movies.map((movie) => <li key={movie.title}>{movie.title}</li>);
      movies.sort((m1, m2) => m1.year < m2.year);
      const listItems = movies.map((movie) => <SearchResult key={movie.imdbID} movie={movie} />);
      return (
         <div className="App">
            <header className="App-header">
               <img src={logo} className="App-logo" alt="logo"/>
               <h1 className="App-title">Movie search</h1>
            </header>
            {
               this.state.movieJson !== '' ?
                  <div>
                     {listItems}
                     {/*JSON.stringify(this.state.movieJson)*/}
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
