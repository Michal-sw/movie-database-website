import {React, useEffect} from 'react'

import Stars from '../../Components/StarRating';
import Delete from '../../Components/DeleteMovie';
import AddOrEditMovie from '../../Components/EditBackend';
import InteractWithBackend from '../../Components/BackEndFetches';

import { useParams, useHistory } from 'react-router';

function MovieDetailedView() {

  const { handleMovieChange, singleMovieDetail } = InteractWithBackend();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    handleMovieChange(id)
  }, [ id ])
  
  return (
    <div className="movie-details-container">
      <div className="take-me-back-button">
        <button onClick={() => history.push("/")}>{"<-"}</button>
        <label>Take me back</label>
      </div>
      <div className="movie-detailed-view-container">
        <div className="movie-details-image">
          <img src={singleMovieDetail.image_url}/>
        </div>
        <div className="movie-details-body">
          <div className="movie-details-info">
            <p>{singleMovieDetail.title}</p>
            <p>{singleMovieDetail.year}</p>
            <p>{singleMovieDetail.genre}</p>
            <p>{singleMovieDetail.director}</p>
            <div className="movie-details-description">
              <p>{singleMovieDetail.description}</p>
            </div>
          </div>

          <div className="movie-details-rating">
            <Stars movieRating={singleMovieDetail.rating} movieId={singleMovieDetail.id}/>
            <AddOrEditMovie movieDetail={singleMovieDetail}/>
            <Delete movieId={singleMovieDetail.id}/>
          </div>
        </div>
      </div>
    </div>
  )
}
export default MovieDetailedView;