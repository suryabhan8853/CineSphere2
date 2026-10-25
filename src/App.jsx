
import { useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");

  const movies = [
    { id: 1, title: "Interstellar", year: 2014, genre: "Sci-Fi", emoji: "🚀", rating: 8.7 },
    { id: 2, title: "Inception", year: 2010, genre: "Thriller", emoji: "🌀", rating: 8.8 },
    { id: 3, title: "3 Idiots", year: 2009, genre: "Comedy", emoji: "🎓", rating: 8.4 },
    { id: 4, title: "Dangal", year: 2016, genre: "Drama", emoji: "🥇", rating: 8.3 },
    { id: 5, title: "Avengers: Endgame", year: 2019, genre: "Action", emoji: "🦸", rating: 8.4 },
    { id: 6, title: "The Dark Knight", year: 2008, genre: "Action", emoji: "🦇", rating: 9.0 },
  ];

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <header className="navbar">
        <a className="logo" href="#home">🎬 CineSphere</a>

        <nav>
          <a href="#home">Home</a>
          <a href="#movies">Movies</a>
          <a href="#watchlist">Watchlist</a>
        </nav>

        <button className="login-button" onClick={() => alert("Login feature coming soon!")}>
          Login
        </button>
      </header>

      <main id="home">
        <section className="hero">
          <p className="eyebrow">YOUR MOVIE. YOUR WORLD.</p>
          <h1>Discover movies.<br /><span>Share your passion.</span></h1>
          <p className="hero-text">
            Explore films, rate your favourites, and build your personal movie collection.
          </p>

          <a className="explore-button" href="#movies">Explore Movies ↓</a>
        </section>

        <section className="movies-section" id="movies">
          <div className="section-heading">
            <div>
              <p className="eyebrow">FIND YOUR NEXT FAVOURITE</p>
              <h2>Explore Movies</h2>
            </div>

            <input
              type="text"
              placeholder="Search movies..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search movies"
            />
          </div>

          <div className="movie-grid">
            {filteredMovies.map((movie) => (
              <article className="movie-card" key={movie.id}>
                <div className="movie-poster">
                  <span>{movie.emoji}</span>
                  <span className="rating">⭐ {movie.rating}</span>
                </div>

                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <p>{movie.year} · {movie.genre}</p>
                  <button
                    className="watchlist-button"
                    onClick={() => alert(`${movie.title} selected! Watchlist feature coming soon.`)}
                  >
                    + Add to Watchlist
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredMovies.length === 0 && (
            <p className="empty-message">No movies found. Try another title.</p>
          )}
        </section>
      </main>

      <footer>
        <a className="logo" href="#home">🎬 CineSphere</a>
        <p>Your next favourite movie is waiting.</p>
        <p>© 2026 CineSphere · Built for movie lovers.</p>
      </footer>
    </div>
  );
}

export default App;

