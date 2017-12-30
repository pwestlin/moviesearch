Trying out [React](https://reactjs.org/).

This app searches movies in [IMDB](http://www.imdb.com/). 

The app uses [OMDB](http://www.omdbapi.com/) as search engine.  
To try this, you must first [get an api key from OMDB](http://www.omdbapi.com/apikey.aspx) and then export the api key as an environment variable before starting the application with npm.
``` 
export REACT_APP_SECRET_OMDB_API_KEY=the_key
npm start
```