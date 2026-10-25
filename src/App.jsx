import { useEffect, useState } from "react";
import "./App.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

function App() {
const [search, setSearch] = useState("");
const [movies, setMovies] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
useEffect(() => {
async function fetchMovies() {
try {
setLoading(true);
setError("");


    const response = await fetch(
      `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );

    if (!response.ok) {
      throw new Error(
        `Unable to fetch movies. HTTP status: ${response.status}`
      );
    }

    const data = await response.json();
    setMovies(data.results || []);
  } catch (err) {
    setError(err.message || "Something went wrong while loading movies.");
  } finally {
    setLoading(false);
  }
}

fetchMovies();


}, []);

async function handleSearch(event) {
const value = event.target.value;
setSearch(value);


if (!value.trim()) {
  try {
    const response = await fetch(
      `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );

    if (!response.ok) {
      throw new Error("Could not reload popular movies.");
    }

    const data = await response.json();
    setMovies(data.results || []);
  } catch {
    setError("Could not reload popular movies.");
  }

  return;
}

try {
  setError("");

  const response = await fetch(
    `${API_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(value)}&language=en-US&page=1`
  );

  if (!response.ok) {
    throw new Error("Movie search failed.");
  }

  const data = await response.json();
  setMovies(data.results || []);
} catch {
  setError("Unable to search movies. Please try again.");
}


}
return ( <div className="app"> <header className="navbar"> <a className="logo" href="#home">
🎬 CineSphere </a>

```
    <nav>
      <a href="#home">Home</a>
      <a href="#movies">Movies</a>
      <a href="#watchlist">Watchlist</a>
    </nav>

    <button
      className="login-button"
      onClick={() => alert("Login feature coming soon!")}
    >
      Login
    </button>
  </header>

  <main id="home">
    <section className="hero">
      <p className="eyebrow">YOUR MOVIE. YOUR WORLD.</p>
      <h1>
        Discover movies.
        <br />
        <span>Share your passion.</span>
      </h1>

      <p className="hero-text">
        Explore films, rate your favourites, and build your personal movie
        collection.
      </p>

      <a className="explore-button" href="#movies">
        Explore Movies ↓
      </a>
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
          onChange={handleSearch}
          aria-label="Search movies"
        />
      </div>

      {loading && <p>Loading movies...</p>}

      {error && <p className="empty-message">{error}</p>}


      {!loading && !error && (
        <>
          <div className="movie-grid">
            {movies.map((movie) => (
              <article className="movie-card" key={movie.id}>
                <div className="movie-poster">
                  {movie.poster_path ? (
                    <img
                      src={`${IMAGE_URL}${movie.poster_path}`}
                      alt={`${movie.title} poster`}
                      loading="lazy"
                    />
                  ) : (
                    <span>🎬</span>
                  )}

                  <span className="rating">
                    ⭐{" "}
                    {typeof movie.vote_average === "number"
                      ? movie.vote_average.toFixed(1)
                      : "N/A"}
                  </span>
                </div>

                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <p>
                    {movie.release_date
                      ? movie.release_date.slice(0, 4)
                      : "Release date unknown"}
                  </p>

                  <button
                    className="watchlist-button"
                    onClick={() =>
                      alert(
                        `${movie.title} selected! Watchlist feature coming soon.`
                      )
                    }
                  >
                    + Add to Watchlist
                  </button>
                </div>
              </article>
            ))}
          </div>

          {movies.length === 0 && (
            <p className="empty-message">
              No movies found. Try another title.
            </p>
          )}
        </>
      )}
    </section>
  </main>

  <footer>
    <a className="logo" href="#home">
      🎬 CineSphere
    </a>
    <p>Your next favourite movie is waiting.</p>
    <p>© 2026 CineSphere · Built for movie lovers.</p>
    <p>
      Movie data and images provided by TMDB. This product uses the TMDB API
      but is not endorsed or certified by TMDB.
    </p>
  </footer>
</div>


);
}

export default App;


