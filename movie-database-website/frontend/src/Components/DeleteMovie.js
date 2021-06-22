/* eslint-disable react/prop-types */

import axios from "axios";
import React from "react";

function Delete(props) {

  function deleteMovie() {
    axios
    .delete(`http://localhost:3000/movie/${props.movieId}`)
    .then(() => console.log("Movie Deleted From Database"))
    .catch(() => console.log("Error with movie deleting"))
  }

  return (
    <div>
      <button onClick={deleteMovie}>
        Delete Movie
      </button>
    </div>
  )
}
export default Delete;