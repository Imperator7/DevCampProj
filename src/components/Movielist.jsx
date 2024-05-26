import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Movielist() {
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  useEffect(() => {
    const fetchMovies = async () => {
      const moviesData = [
        { name: "ANTMAN", img: () => import('../assets/posters/ANTMAN.jpg') },
        { name: "AVATAR 2", img: () => import('../assets/posters/AVATAR 2.jpg')},
        { name: "Bird box", img: () => import('../assets/posters/Bird box.jpg')},
        { name: "Black panther", img: () => import('../assets/posters/Black panther.jpg')},
        { name: "ELEMENTAL", img: () => import('../assets/posters/ELEMENTAL.jpeg')},
        { name: "ENCANTO", img: () => import('../assets/posters/ENCANTO.jpeg')},
        { name: "Harry potter", img: () => import('../assets/posters/Harry potter.jpg')},
        { name: "JOKER", img: () => import('../assets/posters/JOKER.jpg')},
        { name: "Love again", img: () => import('../assets/posters/Love again.jpg')},
        { name: "PIXELS", img: () => import('../assets/posters/PIXELS.jpg')},
        { name: "THOR", img: () => import('../assets/posters/THOR.jpg')},
        { name: "Us", img: () => import('../assets/posters/Us.jpg')},
        { name: "Wonka", img: () => import('../assets/posters/Wonka.jpg')},
      ];

      const loadedMovies = await Promise.all(
        moviesData.map(async (movie) => {
          if (movie.img) {
            const img = await movie.img();
            return { ...movie, img: img.default };
          }
          return movie;
        })
      );

      setMovies(loadedMovies);
    };

    fetchMovies();
  }, []);

  const handleAddWishList = (e) => {
    dispatch({
      type: 'ADD_MOVIE',
      payload: e.target.id
    })
  }

  const handleRemoveWishList = (e) => {
    dispatch({
      type: 'REMOVE_MOVIE',
      payload: e.target.id
    })
  }
  return (
    <div className='movie-list'>
      {movies.map((movie, index) => (
        <div key={index} id={index} className="movie-card" style={{ backgroundImage: `url(${movie.img})`, border: user.movieList.includes(String(index))? '2px solid red' : '2px solid black'}}>
          <label style={{backgroundColor:'white'}}>{movie.name}</label>
          {
            user.movieList.includes(String(index))? (<button id={index} onClick={(e)=>handleRemoveWishList(e)}>Remove from Wishlist</button>) : (<button id={index} onClick={(e)=>handleAddWishList(e)}>Add to Wishlist</button>)
          }
          
        </div>
      ))}
    </div>
  );
}