import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import axios from 'axios'

const blankMovie = {
    title: '',
    director: '',
    metascore: 0,
}

const UpdateMovie = (props) => {
    const {id} = useParams()
    const history = useHistory()
    const [movie, setMovie] = useState(blankMovie)

    useEffect(() => {
        axios
          .get(`http://localhost:5000/api/movies/${id}`)
          .then((res) => {
            // res.data
            setMovie(res.data);
          })
          .catch((err) => console.error(err));
      }, [id]);

      const onChange = (event) => {
          event.preventDefault()
          setMovie({
              ...movie,
              [event.target.name]: event.target.value
          })
      }

      const onSubmit = (event) => {
          event.preventDefault()
          axios.put(`http://localhost:5000/api/movies/${id}`, movie)
          .then(res => {
              console.log(res, 'res in submit update form')
            //   const newMovie = props.movieList.map(value => {
            //       if (value.data.id === res.data.id) {
            //           return  res.data
            //       } else {
            //           return value
            //       }
            //   })
            //   props.setMovieList(newMovie)
            //   setMovie(movie)
            props.setUpdate(!props.update)
              history.push("/")
          })
          .catch(error => {
              console.log(error, 'this is the error')
          })
      }

    return(
        <div>
            Update a Movie
            <form onSubmit={onSubmit}>
                <input 
                type="text"
                name="title"
                value={movie.title}
                placeholder={props.movieList.title}
                onChange={onChange}
             />
             <div />
                <input 
                type="text"
                name="director"
                value={movie.director}
                placeholder={props.movieList.director}
                onChange={onChange}
           />
           <div />
                <input 
                type="text"
                name="metascore"
                value={movie.metascore}
                placeholder={props.movieList.metascore}
                onChange={onChange}
           />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default UpdateMovie;