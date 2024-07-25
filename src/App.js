import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const API_URL = "https://www.omdbapi.com?apikey=228526c0";

const MovieApp = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Function to search for movies based on the title
  const fetchMovies = async (title) => {
    if (title.trim() === "") return; // Prevent empty search
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    if (data.Search) {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  };

  // Default search for "Batman" movies when the component mounts
  useEffect(() => {
    fetchMovies("Batman");
  }, []);

  // Handle enter key press for triggering the search
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchMovies(searchTerm);
    }
  };

  // Reload page on clicking h1 or h2
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="movie-app">
      <h1 onClick={handleReload}>MovieFlix</h1>
      <h2 onClick={handleReload}>Search and Discover Movies</h2>
      <div className="search-bar">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => fetchMovies(searchTerm)}
        />
      </div>

      {movies.length > 0 ? (
        <div className="movie-container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="no-movies">
          <h2>No Movies Found</h2>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>
          Developed by
          <a
            href="https://www.linkedin.com/in/harshil-valiya-1b1082274/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Harshil Valiya
          </a>
        </p>
      </footer>
    </div>
  );
};

export default MovieApp;
