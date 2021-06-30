import {React} from 'react'

import UsePagination from '../../Components/Pagination';
import SortListButtons from '../../Components/SortList';
import FilterParameters from '../../Components/FilterList';
import getMoviesFromBackend from '../../Components/BackEndFetches';

import { Link } from 'react-router-dom';


function MovieListMain() {
  
  const {movieList, setMovieList, originMovieList} = getMoviesFromBackend();

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

export default MovieListMain;