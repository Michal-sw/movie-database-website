import {useState, useEffect} from 'react'
const axios = require('axios')

function getMoviesFromBackend() {

  const [movieList, setMovieList] = useState([]);
  const [originMovieList, setOriginMovieList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/movies")
    .then((result) => {
      setMovieList(result.data);
      setOriginMovieList(result.data)
    })
    .catch((err) => console.log(err));
  }, [])

  return {movieList, setMovieList, originMovieList, setOriginMovieList}
}

export default getMoviesFromBackend;