import { useState } from "react";
import "./MovieApp.css";

export const MovieApp = () => {
  const [search, setSearch] = useState("");
  const [movieList, setMovieList] = useState(null);

  const base_url = "https://api.themoviedb.org/3/search/movie";
  const API_KEY = "";

  const img_url = "https://image.tmdb.org/t/p/w500";

  const handleInputChange = ({ target }) => {
    setSearch(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchMovies();
  };

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `${base_url}?query=${search}&api_key=${API_KEY}`
      );
      const data = await response.json();
      setMovieList(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="title">Movie finder</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Find a movie"
            value={search}
            onChange={handleInputChange}
          />
          <button className="search-button">Search</button>
        </form>
        {movieList && (
          <div className="movie-list">
            {movieList.map((movie) => (
              <div key={movie.id} className="movie-card">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <h2>{movie.title}</h2>
                <p>{movie.overview}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
