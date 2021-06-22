import {React, useState, useEffect} from 'react'

import UsePagination from './Components/Pagination';
import SortListButtons from './Components/SortList';
import FilterParameters from './Components/FilterList';
import AddOrEditMovie from './Components/EditBackend'
import Stars from './Components/StarRating';
import Delete from './Components/DeleteMovie';

import './Styles/App.scss';

import { 
  Route,
  BrowserRouter,
  Switch,
  // Redirect,
  Link,
  // useHistory,
  useParams,
  useHistory
} from 'react-router-dom';

const axios = require('axios')

function App() {

  return (
    <main className="App">
      <BrowserRouter>
        <Switch>
            <Route path='/' component={MovieListMain} exact/>
            <Route path='/movie/:id' component={MovieDetailedView} exact/>
            <Route path='/addMovie' component={AddMovieForm} exact/>
        </Switch>
      </BrowserRouter>
    </main>
  );
}

function MovieListMain() {

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


  return (
    <div className="movie-list-container">
      <div className="sort-and-filter-container">
        <FilterParameters data={movieList} setData={setMovieList} originalData={originMovieList}/>
        <SortListButtons data={movieList} setData={setMovieList}/>
      </div>
      <div className="paginated-movies-container">
        <UsePagination data={movieList} itemsPerPage={6} setData={setMovieList}/>
      </div>
      <div className="add-movie-container">
        <Link to="/addMovie">
          <label>ADD MOVIE</label>
          <button> + </button>
        </Link>
      </div>
    </div>
  )
}

function MovieDetailedView() {

  const history = useHistory();
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3000/movie/${id}`)
    .then((value) => setMovieDetail(value.data))
    .catch((err) => console.log(err));
  }, [id])
  
  return (
    <div className="movie-details-container">
      <div className="take-me-back-button">
        <button onClick={() => history.push("/")}>{"<-"}</button>
        <label>Take me back</label>
      </div>
      <div className="movie-detailed-view-container">
        <div className="movie-details-image">
          <img src={movieDetail.image_url}/>
        </div>
        <div className="movie-details-body">
          <div className="movie-details-info">
            <p>{movieDetail.title}</p>
            <p>{movieDetail.year}</p>
            <p>{movieDetail.genre}</p>
            <p>{movieDetail.director}</p>
            <div className="movie-details-description">
              <p>{movieDetail.description}</p>
            </div>
          </div>

          <div className="movie-details-rating">
            <Stars movieRating={movieDetail.rating} movieId={movieDetail.id}/>
            <AddOrEditMovie movieDetail={movieDetail}/>
            <Delete movieId={movieDetail.id}/>
          </div>
        </div>
      </div>
    </div>
  )
}

function AddMovieForm() {
  const history = useHistory();
  return (
    <div className="add-movie-form">
      <div className="take-me-back-button">
        <button onClick={() => history.push("/")}>{"<----"}</button>
        <label>Take me back</label>
      </div>
      <div className="form-component">
        <div className="form-headline">
          <h1>FILL FORM TO ADD MOVIE</h1>
        </div>
        <AddOrEditMovie movieDetail={{}}/>
      </div>
    </div>
  )
}

export default App;


