import React, {Component} from 'react';
import logo from './movie.png';
import './App.css';

class App extends Component {

   constructor(props) {
      super(props);

      if(process.env.REACT_APP_SECRET_OMDB_API_KEY === undefined) {
         alert("You must set environment variable REACT_APP_SECRET_OMDB_API_KEY");
      }

      this.state = {
         movieJson: '',
         omdbApiKey: process.env.REACT_APP_SECRET_OMDB_API_KEY
      };
      console.log("omdbApiKey:", process.env.REACT_APP_SECRET_OMDB_API_KEY);
   }

   componentDidMount() {
      console.log("componentDidMount");

      this.fetchMovie();
   }

   async fetchMovie() {
      try {
         //const response = await fetch(`http://www.omdbapi.com/?apiKey=${process.env.REACT_APP_SECRET_OMDB_API_KEY}&t=top+secret&y=1984`);
         const response = await fetch(`http://www.omdbapi.com/?apiKey=${this.state.omdbApiKey}&t=top+secret&y=1984`);
         const json = await response.json();
         this.setState({
            movieJson: json
         })
      } catch (error) {
         console.error("Fel vid hätmtning av film: ", error)
      }
   }

   render() {
/*
      contacts: json.results.map(user => (
         {
            name: `${user.name.first} ${user.name.last}`,
            username: `${user.login.username}`,
            email: `${user.email}`,
            location: `${user.location.street}, ${user.location.city}`
         }
      ))
*/

      const {Title, Year, Genre, Actors, Plot, Poster} = this.state.movieJson;
      console.log("Title", Title);
      console.log("Actors", Actors);
      console.log("Poster", Poster);
      return (
         <div className="App">
            <header className="App-header">
               <img src={logo} className="App-logo" alt="logo"/>
               <h1 className="App-title">Movie search</h1>
            </header>
            {
               this.state.movieJson !== '' ?
                  <div>
                     {/*JSON.stringify(this.state.movieJson)*/}
                     <p>Filmen</p>
                     <p>Titel: {Title}</p>
                     <p>År: {Year}</p>
                     <p>Genrer: {Genre}</p>
                     <p>Skådisar: {Actors}</p>
                     <p>Handling: {Plot}</p>
                     <img src={Poster} alt="Bild saknas"/>
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
