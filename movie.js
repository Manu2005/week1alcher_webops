document.addEventListener("DOMContentLoaded", () => {
  const movie = JSON.parse(localStorage.getItem("selectedMovie"));
  const container = document.getElementById("movie-detail");

  if (!movie) {
    container.innerHTML = "<p>Movie not found.</p>";
    return;
  }

  const castHTML = movie.casts
    .filter(c => c.profile_path && c.name)
    .slice(0, 10)
    .map(cast => `
      <div class="cast-card">
        <img src="${cast.profile_path}" alt="${cast.name}" />
        <div class="cast-name">${cast.name}</div>
        <div class="cast-character">${cast.character}</div>
      </div>
    `).join("");

  container.innerHTML = `
    <div class="detail-banner" style="background-image: url('${movie.backdrop_path}')">
      <div class="overlay">
        <img src="${movie.poster_path}" alt="${movie.original_title}" class="poster"/>
        <div class="info">
          <h1>${movie.original_title}</h1>
          <p>${movie.overview}</p>
        </div>
      </div>
    </div>

    <section class="cast-section">
      <h2>Cast of ${movie.original_title}</h2>
      <div class="cast-grid">${castHTML}</div>
    </section>
  `;
});
