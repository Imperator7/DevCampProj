import React, { useState, useEffect } from 'react';

export default function Movielist() {
  const [movies, setMovies] = useState([]);

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

  const handleAddWishList = () => {
    console.log("yeah nice")
  }
  return (
    <div className='movie-list'>
      {movies.map((movie, index) => (
        <div key={index} className="movie-card" style={{ backgroundImage: `url(${movie.img})` }}>
          <label style={{backgroundColor:'white'}}>{movie.name}</label>
          <button onClick={()=>handleAddWishList()}>Add to Wishlist</button>
        </div>
      ))}
    </div>
  );
}