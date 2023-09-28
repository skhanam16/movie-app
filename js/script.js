// console.log(window.location.pathname);
// HIghlight links
let global = {
    currentPage: window.location.pathname
}

// Display Movie details - 6
async function displayMovieDetails(){
    const movieID = window.location.search.split('=')[1];
    console.log(movieID);
    const movie = await fetchAPIData(`movie/${movieID}`);
    const div = document.createElement('div');
    div.innerHTML =`
    <div class="details-top">
    <div>
    ${movie.poster_path ? `<img
src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
class="card-img-top"
alt="${movie.title}"
/>` : ` <img
src="images/no-image.jpg"
class="card-img-top"
alt="${movie.title}"
/>`}
    </div>
    <div>
      <h2>${movie.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        8 / 10
      </p>
      <p class="text-muted">Release Date: ${movie.release_date}</p>
      <p>${movie.overview}</p>
      <h5>Genres</h5>
      <ul class="list-group">
      ${movie.genres.map((genre) =>
        `<li>${genre.name}</li>`).join('')
      }
      </ul>
      <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span> $${movie.budget}</li>
      <li><span class="text-secondary">Revenue:</span> $${movie.revenue}</li>
      <li><span class="text-secondary">Runtime:</span> ${movie.runtimem}</li>
      <li><span class="text-secondary">Status:</span> Released</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">Company 1, Company 2, Company 3</div>
  </div>
    `;
    document.querySelector('#movie-details').appendChild(div);
}


//Spinner show  function is not mandatory we can ignore it

function showSpinner(){
    document.querySelector('.spinner').classList.add('show');
}

//Spinner show  function is not mandatory we can ignore it

function hideSpinner(){
    document.querySelector('.spinner').classList.remove('show');
}

// Display 20 most popular TV shows  - 5
async function displayPopularTVShows(){
    const {results} = await fetchAPIData('tv/popular');
    // console.log(results);
    results.forEach((show) =>{
const div = document.createElement('div');
div.classList.add('card');
div.innerHTML = `<a href="tv-details.html?id=${show.id}">${show.poster_path ? `<img
src="https://image.tmdb.org/t/p/w500${show.poster_path}"
class="card-img-top"
alt="${show.name}"
/>` : ` <img
src="images/no-image.jpg"
class="card-img-top"
alt="${show.name}"
/>`}</a>
<div class="card-body">
<h5 class="card-title">${show.name}</h5>
<p class="card-text">
  <small class="text-muted">Air: ${show.first_air_date}</small>
</p>
</div>`;
const popularMovies = document.getElementById('popular-shows');
popularMovies.appendChild(div);
    });

  
}

// Display popular movies  - 4
async function displayPopularMovies(){
    const {results} = await fetchAPIData('movie/popular');
    // console.log(results);
    results.forEach((movie) =>{
const div = document.createElement('div');
div.classList.add('card');
div.innerHTML = `<a href="movie-details.html?id=${movie.id}">${movie.poster_path ? `<img
src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
class="card-img-top"
alt="${movie.title}"
/>` : ` <img
src="images/no-image.jpg"
class="card-img-top"
alt="${movie.title}"
/>`}</a>
<div class="card-body">
<h5 class="card-title">${movie.title}</h5>
<p class="card-text">
  <small class="text-muted">Release: ${movie.release_date}</small>
</p>
</div>`;
const popularMovies = document.getElementById('popular-movies');
popularMovies.appendChild(div);
    });

  
}

// console.log("this is "  +  global.currentPage);

// Fetch data from TMDB API -3
async function fetchAPIData(endpoint){
    const API_KEY = '37deb54b5edb51960465d52d1258a557';
    const API_URL = 'https://api.themoviedb.org/3/';
    showSpinner();
    const res = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
    const data = await res.json();
    hideSpinner();
    return data;
    // console.log(data);
}

// hightlighted Active link - 2
function highlightedActiveLink(){
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) =>{
        if(link.getAttribute('href') === global.currentPage){
            link.classList.add('active');
        }
    });
   
}

// init app -1 
function init(){
   
    switch(global.currentPage){
        case '/':
        case '/index.html':
        //    console.log('Home');
           displayPopularMovies();
           break;
        case '/shows.html':
            displayPopularTVShows();
            break;
        case '/movie-details.html':
            displayMovieDetails();
            break;
        case '/search.html':
            console.log('Search');
            break;
        case '/tv-details.html':
            console.log('TV details');
            break;
        default:
            console.log("unknown page");

    }
    highlightedActiveLink();
    

  
}

document.addEventListener('DOMContentLoaded', init);
