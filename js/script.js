// console.log(window.location.pathname);
// HIghlight links
let global = {
    currentPage: window.location.pathname
}
// Display popular movies
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

// Fetch data from TMDB API
async function fetchAPIData(endpoint){
    const API_KEY = '37deb54b5edb51960465d52d1258a557';
    const API_URL = 'https://api.themoviedb.org/3/';
    const res = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
    const data = await res.json();
    return data;
    // console.log(data);
}


function highlightedActiveLink(){
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) =>{
        if(link.getAttribute('href') === global.currentPage){
            link.classList.add('active');
        }
    });
   
}

// init app
function init(){
   
    switch(global.currentPage){
        case '/':
        case 'index.html':
        //    console.log('Home');
           displayPopularMovies();
           break;
        case '/shows.html':
            console.log('Shows');
            break;
        case '/movie-details.html':
            console.log('Movie details');
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
