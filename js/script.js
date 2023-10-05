// console.log(window.location.pathname);
// HIghlight links
let global = {
    currentPage: window.location.pathname,
    search: {
        term: '',
        type: '',
        page: 1,
        totalPage: 1
    },
    api: {
        apiKey: '37deb54b5edb51960465d52d1258a557',
        apiUrl: 'https://api.themoviedb.org/3/'
    }
}



// Display Show details - 7
async function displayShowDetails(){
    const showID = window.location.search.split('=')[1];
    console.log("this is id" + showID);
    const show = await fetchAPIData(`tv/${showID}`);
    console.log(show);
    const div = document.createElement('div');
    div.innerHTML =`
    <div class="details-top">
    <div>
    ${show.poster_path ? `<img
src="https://image.tmdb.org/t/p/w500${show.poster_path}"
class="card-img-top"
alt="${show.name}"
/>` : ` <img
src="images/no-image.jpg"
class="card-img-top"
alt="${show.name}"
/>`}
    </div>
    <div>
      <h2>${show.name}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        8 / 10
      </p>
      <p class="text-muted">Last air Date: ${show.last_air_date}</p>
      <p>${show.overview}</p>
      <h5>Genres</h5>
      <ul class="list-group">
      ${show.genres.map((genre) =>
        `<li>${genre.name}</li>`).join('')
      }
      </ul>
      <a href="${show.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Show Info</h2>
    <ul>
      <li><span class="text-secondary">Number of Episodes</span> $${show.number_of_episodes}</li>
      <li><span class="text-secondary">Last Episode to Air:</span> ${show.last_episode_to_air.name}</li>
  
      <li><span class="text-secondary">Status:</span> Released</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">Company 1, Company 2, Company 3</div>
  </div>
    `;
    document.querySelector('#show-details').appendChild(div);
}



// Display Movie details - 6
async function displayMovieDetails(){
    // window. location.search returns the query string from the current URL of the web page.
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
    // within the object there is results array
    // console.log("test the results" + results);
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

// Display movie slider - 8
async function displaySlider(){
    const {results} = await fetchAPIData('movie/now_playing');
    // console.log(results);
    results.forEach((movie) =>
    {
        const div = document.createElement('div');
        div.classList.add('swiper-slide');
        div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
        </a>
        <h4 class="swiper-rating">
          <i class="fas fa-star text-secondary"></i>  ${movie.vote_average} / 10
        </h4>
        `;
        document.querySelector('.swiper-wrapper').appendChild(div);
        initSlider();
    });
   
}

// Initialise swiper object - 9

function  initSlider(){
    const swiper = new Swiper('.swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        freeMode: true,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false},
        breakpoints:{
            500: {
                slidesPerView: 2},
            700: {
                slidesPerView: 3},
            1200: {
                slidesPerView: 4},

            }
        });
    }

// Fetch data form url - 9

async function search(){
    const queryString = window.location.search;
    // console.log(queryString); perfect outcome
    const urlParams = new URLSearchParams(queryString);
    // console.log(urlParams.get('type')); - works perfect
    global.search.type = urlParams.get('type');
    console.log(global.search.type);
    global.search.term = urlParams.get('search-term');
    console.log(global.search.term);
    if(global.search.type !== '' && global.search.type !== null){
    //    @todo - make request and display results
    const {results} = await searchAPIData();
    if(results.length === 0){
        showAlert("No results found");
        return;
    }
    // displaySearchResults();
    displaySearchResults(results);
    document.querySelector('#search-term').value = '';

    }
    else{
        showAlert("Please enter search term", 'error');
    }
}

// Fetch data from TMDB API -3
async function fetchAPIData(endpoint){
    // const API_KEY = '37deb54b5edb51960465d52d1258a557';
    // const API_URL = 'https://api.themoviedb.org/3/';
    const API_KEY = global.api.apiKey;
    const API_URL = global.api.apiUrl;
    showSpinner();
    const res = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
    const data = await res.json();
    hideSpinner();
    return data;
    // console.log(data);
}

// Fetch data from TMDB API -11
async function searchAPIData(){
    // const API_KEY = '37deb54b5edb51960465d52d1258a557';
    // const API_URL = 'https://api.themoviedb.org/3/';
    const API_KEY = global.api.apiKey;
    const API_URL = global.api.apiUrl;
    showSpinner();
    // const res = await fetch(`${API_URL}search?${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}`);
    const res = await fetch(
        `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`
      );
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

// Show alert message - 10

function showAlert(message, className = "error"){
    const alertEL = document.createElement('div');
    alertEL.classList.add('alert', className);
    alertEL.appendChild(document.createTextNode(message));
    document.getElementById('alert').appendChild(alertEL);
    setTimeout(() =>{
alertEL.remove()
    }, 3000);
}

// init app -1 
function init(){
   
    switch(global.currentPage){
        case '/':
        case '/index.html':
        //    console.log('Home');
           displaySlider();
           displayPopularMovies();
           break;
        case '/shows.html':
            displayPopularTVShows();
            break;
        case '/movie-details.html':
            displayMovieDetails();
            break;
        case '/search.html':
            search();
            break;
        case '/tv-details.html':
            displayShowDetails();
            break;
        default:
            console.log("unknown page");

    }
    highlightedActiveLink();
    

  
}

document.addEventListener('DOMContentLoaded', init);
