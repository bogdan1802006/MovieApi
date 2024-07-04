const searchBar = document.querySelector('#search')
const enterBtn = document.querySelector('#main-btn')
const mainCont = document.querySelector('#movie-container')
const apiKey = '81bcb1ec';

async  function fetchMovies(query) {
    try {
        const resp = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${query}`)

        
        if (!resp.ok) {
            throw new Error('Invalid request')
        }
        const result = await resp.json()
        return result
    }
        catch (err) {
            console.log(err)
            return null
        }
}


let generateMovie = (movie) => {
    return `
        <div>
            <img src="${movie.Poster}" class="main-image" height="350px">
        </div>
        
        <div class="main-content">
            <div>
                <h1 class="movie-title">${movie.Title}</h1>
            </div>
            <div class="year-ratings-released">
                <p>Year: ${movie.Year}</p>
                <p class="rate">Ratings: ${movie.imdbRating}</p>
                <p>Released: ${movie.Released}</p>
            </div>
            <div>
                <p>Genre: ${movie.Genre}</p>
            </div>
            <div>
                <p>Writer: ${movie.Writer}</p>
            </div>
            <div>
                <p>Actors: ${movie.Actors}</p>
            </div>
            <div class="plot-container">
                <p>Plot: ${movie.Plot}</p>
            </div>
            <div>
                <p class="language">Language: ${movie.Language}</p>
            </div>
            <div>
                <p>${movie.Awards}</p>
            </div>
        </div>
    `
}

enterBtn.addEventListener('click', async function(){
    const query = searchBar.value
    const movie = await fetchMovies(query)
    if (movie && movie.Response === "True") {
        mainCont.innerHTML = generateMovie(movie)
    } else {
        mainCont.innerHTML = `
            <div class="error-cont">
            <h2>Movie has not been found</h2>
            <i class='bx bxs-sad'></i>
            </div>
        `
    }
   
})