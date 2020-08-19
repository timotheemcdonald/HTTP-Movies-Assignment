import React, {useState, useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import axios from 'axios'

const blankMovie = {
    title: '',
    director: '',
    metascore: 0,
    stars: []
}

const AddMovie = (props) => {
    const [newMovie, setMovie] = useState(blankMovie)
    const [star, setStar] = useState('')

    const history = useHistory()
    const {id} = useParams()

    // useEffect(() => {
    //     axios
    //       .get(`http://localhost:5000/api/movies/${id}`)
    //       .then((res) => {
    //         // res.data
    //         setMovie(res.data);
    //       })
    //       .catch((err) => console.error(err));
    //   }, [id]);

      const onChange = (event) => {
          event.preventDefault()
          setMovie({
              ...newMovie,
              [event.target.name]: event.target.value
          })
      }

      const onStarsSubmit = (e) => {
          e.preventDefault()
          setMovie({
              ...newMovie,
              stars: [...newMovie.stars, star]
          })
      }

      const onStarsChange = (e) => {
          e.preventDefault()
          setStar(e.target.value)
      }

      const onSubmit = (event) => {
          event.preventDefault()
          axios.post(`http://localhost:5000/api/movies/`, newMovie)
          .then(res => {
              console.log(res, 'res in addMovie')
                props.setMovieList([...props.movieList],res.data)
                history.push("/")
                props.setUpdate(!props.update)
      
          })
          .catch(error => {
              console.log(error, 'error in adding movie')
          })
      }





    return(
        <div>
            Add a Movie
            <form onSubmit={onSubmit}>
          
                <div>Title:
            <input 
                type="text"
                name="title"
                value={newMovie.title}
                onChange={onChange}
                />
                </div>
        <div>Director:
                <input 
                type="text"
                name="director"
                placeholder="Enter Director"
                value={newMovie.director}
                onChange={onChange}
             />
             </div>
             <div>Metascore:
              <input 
                type="text"
                name="metascore"
                value={newMovie.metascore}
                onChange={onChange}
             />
              </div>
                <button type="submit">Submit</button>
                </form>
    <div>{newMovie.stars.map(star => <p>{star}</p> )}</div>
                <form onSubmit={onStarsSubmit}>Stars:
            <input 
                type="text"
                name="stars"
                value={star}
                onChange={onStarsChange}
                />
                <button type="submit">Add Star</button>
                </form>
        </div>
    )
}

export default AddMovie;