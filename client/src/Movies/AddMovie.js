import React, {useState, useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import axios from 'axios'

const blankMovie = {
    id: 0,
    title: '',
    director: '',
    metascore: 0,
    stars: []
}

const AddMovie = (props) => {
    const [newMovie, setMovie] = useState(blankMovie)

    const history = useHistory()
    const {id} = useParams()

      const onChange = (event) => {
          event.preventDefault()
          setMovie({
              ...newMovie,
              [event.target.name]: event.target.value
          })
      }

      const onSubmit = (event) => {
          event.preventDefault()
          axios.post(`http://localhost:5000/api/movies/`)
          .then(res => {
              console.log(res, 'res in addMovie')
                setMovie(res.data)
          })
          .catch(error => {
              console.log(error, 'error in adding movie')
          })
      }



    return(
        <div>
            Add a Movie
            <form onSubmit={onSubmit}>
            <div>Id Number:
            <input 
                type="text"
                name="id"
                value={newMovie.id}
                onChange={onChange}
                />
                </div>
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
       <div>Stars:
            <input 
                type="text"
                name="stars[]"
                value={newMovie.stars}
                onChange={onChange}
                />
                </div>
                <button type="submit">Submit</button>
                </form>
        </div>
    )
}

export default AddMovie;