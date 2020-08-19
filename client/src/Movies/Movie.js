import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie(props) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory()

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const onClick = (event) => {
    event.preventDefault()
    history.push(`/update-movie/${movie.id}`)
  }

  const handleDelete = (event) => {
    event.preventDefault()
    axios
    .delete(`http://localhost:5000/api/movies/${movie.id}`)
    .then((res) => {
     
      console.log(res, res.data, 'res and res.data in delete movie')
      props.setUpdate(!props.update)
      history.push("/");
      
      // afternoon project
      // server returns the id of the deleted item
      // you will have to filter out that item from the item list
    })
    .catch((err) => console.log(err));
};
  

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button onClick={onClick}>Update Movie</button>
      <button onClick={handleDelete}>Delete Movie</button>
    </div>
  );
}

export default Movie;
