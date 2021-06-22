/* eslint-disable react/prop-types */

import { React, useState, useEffect } from "react";
import {Formik, Form, Field} from "formik";
import { useHistory } from "react-router-dom";

const axios = require('axios')

function AddOrEditMovie(props) {

  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/movies")
    .then((result) => {
      setMovieList(result.data);
      console.log(movieList);
    })
    .catch((err) => console.log(err));
  }, [])

  // Movie Entity Structure 
  // {
  //   "id": 6,
  //   "title": "Matrix",
  //   "director": "Lilly. Wachowski",
  //   "genre": "Sci-Fi",
  //   "year": 1999,
  //   "description": "Haker komputerowy Neo...",
  //   "image_url": "https://fwcdn.pl/fpo/06/28/628/7685907.6.jpg",
  //   "rating_count": 9,
  //   "rating": 4
  // }

  
const history = useHistory();
const [validateFormSubmit, setValidateFormSubmit] = useState(false);
const [errorMessage, setErrorMessage] = useState(null)

  return (
        <Formik
          enableReinitialize={true}
          initialValues={
            {
              id: props.movieDetail.id || null,
              title: props.movieDetail.title || "",
              director: props.movieDetail.director || '',
              genre: props.movieDetail.genre || '',
              year: props.movieDetail.year || '',
              description: props.movieDetail.description || '',
              image_url: props.movieDetail.image_url || "https://audio-book.net.pl/image/200/285?url=https%3A%2F%2Faudio-book.net.pl%2Fuploads%2Fposts%2Fthumbs%2FzU0KpB1z.jpg",
              rating_count: props.movieDetail.rating_count || 0,
              rating: props.movieDetail.rating || 0
            }}
          validate={(values) => {

            const errors = {}

            if (values.year < 1000) errors.year = 'Year must be valid'

            if (values.title.length < 1) errors.title = 'Title Required'

            if (values.director.length < 1) errors.director = 'Director Required'

            if (values.genre.length < 1) errors.genre = 'Genre Required'

            if (values.description.length < 1) errors.description = "Description Required"
            
            if (Object.keys(errors).length === 0) {
              setValidateFormSubmit(true)
              setErrorMessage(null)
            } else {
              setValidateFormSubmit(false)
              setErrorMessage(() => {
                return (
                  <div className="error-message">
                    <p>
                      Wpisz poprawne dane!
                    </p>
                    <div className="field-errors">
                      <p>{errors.title}</p>
                      <p>{errors.director}</p>
                      <p>{errors.genre}</p>
                      <p>{errors.year}</p>
                      <p>{errors.description}</p>
                    </div>
                  </div>

                )
              })
            }

            return errors
          }}
          onSubmit={(values) => {
            if (values.id !== null) {
              axios.put(`http://localhost:3000/movie/${values.id}`, values)
              .then(() => history.push("/"))
              .catch((er) => console.log(er.response.data))
            } else {
              axios.post(`http://localhost:3000/movie`, values)
              .then(() => history.push("/"))
              .catch((er) => console.log(er.response.data))
            } 
          }}>
{/* {errorMessage.title ? <p>{errorMessage.title}</p> : null}
{errorMessage.director ? <p>{errorMessage.title}</p> : null}
{errorMessage.genre ? <p>{errorMessage.title}</p> : null}
{errorMessage.year ? <p>{errorMessage.title}</p> : null}
{errorMessage.description ? <p>{errorMessage.title}</p> : null} */}
          <Form>
            <div className="form-fields">
              <div  className="title-field">
                <label>Title</label>
                <Field name="title" type="text" placeholder="Title..."/> 
              </div>
              <div className="director-field">
                <label>Director</label>
                <Field name="director" type="text" placeholder="Director..."/> 
              </div>
              <div className="genre-field">
                <label>Genre</label>
                <Field name="genre"type="text" placeholder="Genre..."/> 
              </div>
              <div className="year-field">
                <label>Year</label>
                <Field name="year" type="number" placeholder="2021..."/> 
              </div>
              <div className="description-field">
                <label>Description</label>
                <Field name="description" type="text" placeholder="Description..."/> 
              </div>
              <div className="imageurl-field">
                <label>Image URL</label>
                <Field name="image_url" type="text" placeholder="image_url..."/>
              </div>
            </div>

            <div className="form-submit">
              <button type="submit" disabled={!validateFormSubmit}>Ok</button>
              {errorMessage}
            </div>
          </Form>
          
        </Formik>
  )
}

export default AddOrEditMovie;