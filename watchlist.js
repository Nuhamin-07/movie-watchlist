function renderWatchlist() {
  const watchList = JSON.parse(localStorage.getItem("watchlist")) || [];
  let html = "";

  for (let movie of watchList) {
    html += `
      <div class="lists container" data-id="${movie.imdbID}">
        <img src="${movie.Poster}" />
        <div>
          <div class="movie-title">
            <h3 class="movie-title">${movie.Title}</h3>
            <p><i class="fa-solid fa-star"></i> ${movie.imdbRating}</p>
          </div>
          <div class="movie-genre">
            <p>${movie.Runtime}</p>
            <p>${movie.Genre}</p>
            <button class="remove-watchlist" data-id="${movie.imdbID}">
              <i class="fa-solid fa-circle-minus"></i> Remove
            </button>
          </div>
          <p class="movie-description">${movie.Plot}</p>
        </div>
      </div>
    `;
  }

  document.getElementById("my-watchlist").innerHTML = html;

  // Add click event listeners to all remove buttons
  const removeButtons = document.querySelectorAll(".remove-watchlist");
  removeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const movieId = this.dataset.id;
      const updatedWatchlist = watchList.filter(
        (movie) => movie.imdbID !== movieId
      );
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
      renderWatchlist(); // re-render after removing
    });
  });
}

// Call the function on page load
renderWatchlist();
