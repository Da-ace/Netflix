/* 
🌟 APP: Make Netflix

Here we have the Netflix app but it's up to you to make it work by pulling all the movies using an API!

Create a fetchMovies() function that will make a dynamic API call to what you need 👇
========================================

- fetchMovies()

** fetchMovies takes in an URL, a div id or class from the HTML, and a path (poster or backdrop)



These are the 3 main functions and their URL'S you must create  👇
========================================

- getOriginals()
  * URL : 'https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213'

- getTrendingNow()
  * URL : 'https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045'

- getTopRated()
  * URL : 'https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1'


** These functions will provide the URL you need to fetch() movies of that genere **

These are all the DIV ID's you're gonna need access to 👇
========================================================
#1 CLASS 👉 'original__movies' = Div that holds Netflix Originals
#2 ID 👉 'trending' = Div that holds trending Movies
#3 ID 👉 'top_rated' = Div that holds top rated Movies
*/
const ogMoviesContainer = document.querySelector("#original__movies");
const trendingContainer = document.querySelector("#trending");
const topRatedContainer = document.querySelector("#top_rated");

const imgBaseUrl = "https://image.tmdb.org/t/p/original";

const OG_URL =
  "https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045";
const TRENDING_URL =
  "https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045";
const TOP_RATED_URL =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1";

const getGenresMovies = async (url) => {
  let moviesJson;
  try {
    const response = await fetch(url);
    moviesJson = await response.json();
  } catch (error) {
    console.error(error);
  }
  return moviesJson;
};

const getGenre = async (genre_url, container, img_type) => {
  let results = [];
  results = await getGenresMovies(genre_url);
  console.log(results);

  results.results.map((movie) => {
    const movieUrl = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US`;
    const img = document.createElement("img");
    const p = document.createElement("p");
    const div = document.createElement("div");
    p.textContent = movie.original_title;
    img.setAttribute("src", `${imgBaseUrl}${movie[img_type]}`);
    img.dataset.movie_id = movie.id;
    div.appendChild(img);
    div.appendChild(p);
    container.appendChild(div);
    container.style.overflow = "scroll";
    img.addEventListener("click", async () => {
      const trailerUrl = await getTrailer(movieUrl);
      console.log(trailerUrl);
      const frame = document.querySelector("#movieTrailer");
      frame.setAttribute("src", trailerUrl);
    });
  });
};

const getTrailer = async (url) => {
  try {
    const response = await fetch(url);
    const results = await response.json();

    const videos = results.results;
    const trailer =
      videos &&
      videos.find(({ type, site }) => type === "Trailer" && site === "YouTube");
    const { key } = trailer;
    const trailerUrl = `https://www.youtube.com/embed/${key}`;
    return trailerUrl;
  } catch (error) {
    console.error(error);
  }
};

const handleSelection = (async = () => {});

getGenre(OG_URL, ogMoviesContainer, "poster_path");
getGenre(TRENDING_URL, trendingContainer, "backdrop_path");
getGenre(TOP_RATED_URL, topRatedContainer, "backdrop_path");
