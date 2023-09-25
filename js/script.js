// console.log(window.location.pathname);
const global = {
    currentPage: window.location.pathname
}
// HIGHLIGHT Active Links

function highlightActiveLink(){
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) =>{
        if(link.getAttribute('href') === global.currentPage){
            link.classList.add('active');

        }

    })
}

// highlightMovie.addEventListener('focus',highlightActiveLink);

// INIT Appp
console.log(global.currentPage);
function init(){
    switch(global.currentPage){
        case '/':
        case '/index.html':
            console.log('Home')
            break;
        case '/movie-details.html':
             console.log('Movie details');
             break;
        case '/shows.html':
            console.log('Shows');
            break;
        case '/tv-details.html':
            console.log('TV details');
            break;
        case '/search.html':
            console.log('Search');
            break;
       
    }
    highlightActiveLink();
}

// init();
document.addEventListener('DOMContentLoaded', init);