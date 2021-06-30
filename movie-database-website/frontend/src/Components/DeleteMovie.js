/* eslint-disable react/prop-types */

import React from "react";
import InteractWithBackend from "./BackEndFetches";

function Delete(props) {
  const { deleteMovie } = InteractWithBackend();

  return (
    <div>
      <button onClick={() => deleteMovie(props.movieId)}>
        Delete Movie
      </button>
    </div>
  )
}
export default Delete;