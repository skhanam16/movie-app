…or create a new repository on the command line
echo "# movie-app" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/skhanam16/movie-app.git
git push -u origin main
…or push an existing repository from the command line
git remote add origin https://github.com/skhanam16/movie-app.git
git branch -M main
git push -u origin main

URLSearchParams - URLSearchParams is a built-in JavaScript object that allows you to work with the query string of a URL. It provides methods for appending, deleting, getting, and setting key-value pairs in the query string. You can use it to easily modify and manipulate the URL in your web applications.

window. location.search returns the query string from the current URL of the web page. The query string contains data to be passed to a web server for further processing of a requested resource.