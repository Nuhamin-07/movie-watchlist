const movieSearchInput = document.getElementById("movie-search-input");
const watchListMovies = JSON.parse(localStorage.getItem("watchlist")) || [];
let movieDetailMap = {}; // Store details keyed by imdbID

document
  .getElementById("search-btn")
  .addEventListener("click", async function () {
    let html = "";
    movieDetailMap = {}; // Clear old results

    const res = await fetch(
      `https://www.omdbapi.com/?s=${movieSearchInput.value}&apikey=60fd65e9`
    );
    const data = await res.json();

    for (let movie of data.Search) {
      const resTwo = await fetch(
        `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=60fd65e9`
      );
      const dataTwo = await resTwo.json();
      movieDetailMap[movie.imdbID] = dataTwo; // Store full detail

      html += `
      <div class="lists">
        <img src="${dataTwo.Poster}"/>
        <div>
          <div class="movie-title">
            <h3 class="movie-title">${dataTwo.Title}</h3>
            <p><i class="fa-solid fa-star"></i> ${dataTwo.imdbRating}</p>
          </div>
          <div class="movie-genre">
            <p>${dataTwo.Runtime}</p>
            <p>${dataTwo.Genre}</p>
            <button class="watchlist" data-id="${movie.imdbID}">
              <i class="fa-solid fa-circle-plus"></i> Watchlist
            </button>
          </div>
          <p class="movie-description">${dataTwo.Plot}</p>
        </div>
      </div>
      <hr/>
    `;
    }

    document.getElementById("movie-list").innerHTML = html;
  });

// Handle button clicks separately
document.addEventListener("click", function (e) {
  const watchBtn = e.target.closest(".watchlist");
  if (watchBtn && watchBtn.dataset.id) {
    const movieID = watchBtn.dataset.id;
    const movie = movieDetailMap[movieID];

    if (movie) {
      const alreadyInList = watchListMovies.some((m) => m.imdbID === movieID);
      if (!alreadyInList) {
        watchListMovies.push(movie);
        localStorage.setItem("watchlist", JSON.stringify(watchListMovies));
        console.log(`✅ Added "${movie.Title}" to watchlist.`);
      } else {
        console.log(`⚠️ "${movie.Title}" is already in your watchlist.`);
      }
    }
  }
});
