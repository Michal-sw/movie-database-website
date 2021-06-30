import {React} from 'react'
import { useHistory } from 'react-router';
import AddOrEditMovie from '../../Components/EditBackend';

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

export default AddMovieForm;