import {useState, useEffect} from 'react'
const axios = require('axios')

function InteractWithBackend() {

  const [movieList, setMovieList] = useState([]);
  const [originMovieList, setOriginMovieList] = useState([]);
  const [singleMovieDetail, setSingleMovieDetail] = useState({});

  useEffect(() => {
    axios
    .get("http://localhost:3000/movies")
    .then((result) => {
      setMovieList(result.data);
      setOriginMovieList(result.data)
    })
    .catch((err) => console.log(err));
  }, [])

  const handleMovieChange = (movieId) => {
    axios.get(`http://localhost:3000/movie/${movieId}`)
    .then((value) => setSingleMovieDetail(value.data))
    .catch((err) => console.log(err));
  } 

  const deleteMovie = (movieId) => {
    axios
    .delete(`http://localhost:3000/movie/${movieId}`)
    .then(() => console.log("Movie Deleted From Database"))
    .catch(() => console.log("Error with movie deleting"))
  }

  return {movieList, setMovieList, originMovieList, handleMovieChange, singleMovieDetail, deleteMovie}
}

export default InteractWithBackend;