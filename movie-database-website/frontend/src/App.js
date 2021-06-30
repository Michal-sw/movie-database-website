import {React} from 'react'

import MovieListMain from './Routes/MovieListMain/MovieListMain';
import MovieDetailedView from './Routes/MovieDetailedView/MovieDetailedView';
import AddMovieForm from './Routes/AddMovieForm/AddMovieForm';

import './Styles/App.scss';

import { 
  Route,
  BrowserRouter,
  Switch
} from 'react-router-dom';

const App = () => (
  <main className="App">
    <BrowserRouter>
      <Switch>
          <Route path='/' component={MovieListMain} exact/>
          <Route path='/movie/:id' component={MovieDetailedView} exact/>
          <Route path='/addMovie' component={AddMovieForm} exact/>
      </Switch>
    </BrowserRouter>
  </main>
)

export default App;


