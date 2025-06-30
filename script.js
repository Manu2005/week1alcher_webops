
const API_URL = "https://jsonfakery.com/movies/paginated";
let currentPage = 1;
let currentMovies = [];

async function loadMovies(page = 1) {
  const res = await fetch(`${API_URL}?page=${page}`);
  const data = await res.json();
  currentMovies = data.data;
  renderMovies(currentMovies);
  document.getElementById("page-indicator").textContent = `Page ${page}`;
  prevBtn.disabled = page === 1;
}


const movieGrid = document.getElementById("movie-grid");
const modal = document.getElementById("movie-modal");
const modalPoster = document.getElementById("modal-poster");
const modalTitle = document.getElementById("modal-title");
const modalOverview = document.getElementById("modal-overview");
const modalCast = document.getElementById("modal-cast");
const detailsBtn = document.getElementById("details-btn");
const closeBtn = document.querySelector(".close-btn");
const prevBtn = document.getElementById("prev-page");
const nextBtn = document.getElementById("next-page");
const pageIndicator = document.getElementById("page-indicator");

async function fetchMovies(page = 1) {
  try {
    const res = await fetch(`${API_URL}?page=${page}`);
    const data = await res.json();
    renderMovies(data.data);
    updatePagination(data.current_page, data.total_pages);
  } catch (err) {
    console.error("Error fetching movies:", err);
  }
}

function renderMovies(movies) {
  movieGrid.innerHTML = "";

  movies.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.style.backgroundImage = `url(${movie.poster_path})`;
    card.addEventListener("click", () => {
  localStorage.setItem("selectedMovie", JSON.stringify(movie));
  window.location.href = "movie.html";
});

    const titleOverlay = document.createElement("div");
    titleOverlay.className = "movie-title";
    titleOverlay.textContent = movie.original_title;

    card.appendChild(titleOverlay);

    card.addEventListener("click", () => openModal(movie));

    movieGrid.appendChild(card);
  });
}




function updatePagination(current, total) {
  currentPage = current;
  pageIndicator.textContent = `Page ${current}`;
  prevBtn.disabled = current === 1;
  nextBtn.disabled = current === total;
}

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) fetchMovies(currentPage - 1);
});

nextBtn.addEventListener("click", () => {
  fetchMovies(currentPage + 1);
});


fetchMovies();


const searchInput = document.querySelector(".search-bar");
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();
  const filtered = currentMovies.filter(movie =>
    movie.original_title.toLowerCase().includes(query)
  );
  renderMovies(filtered);
});

