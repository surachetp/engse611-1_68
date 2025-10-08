import React, { useState, useEffect } from 'react';
import './style.css';

const LOCAL_STORAGE_KEY = 'movieWishlistApp.movies';

function App() {
  const [movies, setMovies] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedMovies) setMovies(storedMovies);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(movies));
  }, [movies]);

  const handleAddMovie = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const newMovie = {
      id: Date.now(),
      text: inputValue,
      watched: false,
    };

    setMovies(prev => [newMovie, ...prev]);
    setInputValue('');
  };

  const handleDeleteMovie = (id) => {
    setMovies(prev => prev.filter(movie => movie.id !== id));
  };

  const handleToggleWatched = (id) => {
    setMovies(prev =>
      prev.map(movie =>
        movie.id === id ? { ...movie, watched: !movie.watched } : movie
      )
    );
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🎬 Movie Wishlist</h1>
        <p>What do you want to watch next?</p>
      </header>

      <main>
        <form className="add-movie-form" onSubmit={handleAddMovie}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="e.g., The Matrix"
          />
          <button type="submit">Add</button> {/* ปุ่ม Add อยู่ตรงนี้ถูกต้อง */}
        </form>

        <section className="movie-wishlist">
          <h2>My List</h2>
          {movies.length > 0 ? (
            <ul className="movie-list">
              {movies.map(movie => (
                <li
                  key={movie.id}
                  className={`movie-item ${movie.watched ? 'watched' : ''}`}
                >
                  <span
                    onClick={() => handleToggleWatched(movie.id)}
                  >
                    {movie.text}
                  </span>
                  <div>
                    <button
                      className="watched-btn"
                      onClick={() => handleToggleWatched(movie.id)}
                    >
                      ✔
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteMovie(movie.id)}
                    >
                      &times;
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-list-message">
              Your wishlist is empty. Add a movie to get started!
            </p>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
