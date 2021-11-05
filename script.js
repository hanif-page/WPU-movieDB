// fetch refactor (async await)
const movieSearchBtn = document.querySelector(".search-button")
movieSearchBtn.addEventListener('click', async function(){

    // error handling
    try 
    {
        const movieSearchBar = document.querySelector(".input-keyword")
        const movieAPI = "http://www.omdbapi.com/?apikey=1bd23da1&s=" + movieSearchBar.value; // movieSearchBar.value is the keyword that has type
        
        const movieContainer = document.querySelector(".movie-container")
        movieContainer.innerHTML = ""
    
        const movies = await getMovies(movieAPI)
        updateUI(movies, movieContainer)
    }
    catch(err)
    {
        alert(err)
    }
})

const getMovies = (url) => {
    return fetch(url)
                .then(res => {
                    if( !res.ok )
                    {
                        throw new Error(res.statusText)
                    }
                    return res.json()
                }) 
                .then(res => {
                    if( res.Response === "False")
                    {
                        throw new Error(res.Error)
                    }
                    return res.Search
                })
}

const updateUI = (movies, movieContainer) => {

    movies.forEach(movie => {
        let card = generateCard(movie);

        movieContainer.innerHTML += card;
    })
}

const getMovieDetail = async (url) => {
    return fetch(url)
                .then(async res => await res.json())
                .then(async movie => await movie)
                .catch(err => err)
}

const updateUIMovieDetail = (movieDetail) => {
    const modalMovie = generateModalMovie(movieDetail);

    const modalBody = document.querySelector(".modal-body")
    modalBody.innerHTML = modalMovie
}

// event binding
document.addEventListener('click', async function(e){

    // 'Show Detail' button
    if ( e.target.classList.contains("modal-detail-button") )
    {
        const movieAPIbyImdbID = "http://www.omdbapi.com/?apikey=1bd23da1&i=" + e.target.dataset.imdbid;
        
        const movieDetail = await getMovieDetail(movieAPIbyImdbID);

        updateUIMovieDetail(movieDetail)
    }
})

// clear movie button
const clearMovieBtn = document.querySelector(".clear-movie")
clearMovieBtn.addEventListener('click', function(){
    const movieContainer = document.querySelector(".movie-container")
    movieContainer.innerHTML = ""
})

const generateCard = (m) => {
    return `
            <div class="col-md-4 my-5">
                <div class="card">
                    <img src="${m.Poster}" class="card-img-top" alt="${m.Title}">
                    <div class="card-body">
                    <h5 class="card-title">${m.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                    <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
                    </div>
                </div>
            </div>
    `
}
const generateModalMovie = (m) => {
    return `
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${m.Poster}" class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                            <li class="list-group-item"><strong>Director : ${m.Director}</strong></li>
                            <li class="list-group-item"><strong>Actors : ${m.Actors}</strong></li>
                            <li class="list-group-item"><strong>Writer : ${m.Writer}</strong></li>
                            <li class="list-group-item"><strong>Plot : </strong> <br> ${m.Plot}</li>
                        </ul>
                    </div>
                </div>
            </div>
    `
}