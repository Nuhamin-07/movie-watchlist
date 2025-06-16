const movieSearchInput = document.getElementById("movie-search-input")

    
document.getElementById("search-btn").addEventListener("click", async function() {
    let html = ""
    const res = await fetch(`https://www.omdbapi.com/?s=${movieSearchInput.value}&apikey=60fd65e9`)
    const data = await res.json()
            for(let movie of data.Search) {
                const resTwo = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=60fd65e9`)
                const dataTwo = await resTwo.json()
                        html += `
                    <div class="lists" data-id="${movie.imdbID}">
                        <img src="${dataTwo.Poster}"/>
                        <div>
                            <div class="movie-title">
                                <h3 class="movie-title">${dataTwo.Title}</h3>
                                <P>
                                <i class="fa-solid fa-star"></i>
                                    ${dataTwo.imdbRating}
                                </P>
                            </div>
                            <div class="movie-genre">
                                <P>${dataTwo.Runtime}</P>
                                <P>${dataTwo.Genre}</P>
                                <button id="watchlist" class="watchlist">
                                    <i class="fa-solid fa-circle-plus"></i>
                                    Watchlist
                                </button>
                            </div>
                            <P class="movie-description">${dataTwo.Plot}</P>
                        </div>
                    </div>
                    <hr/>
                `
            }
            document.getElementById("movie-list").innerHTML = html
           
//     document.getElementById("watchlist").addEventListener("click", function(e) {
//     console.log(e.currentTarget.dataset.id)
// })
})


