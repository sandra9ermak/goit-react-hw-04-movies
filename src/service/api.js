import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
const API_KEY = "ff289dac182df51deedab30d3c7629dd";

export const trendMovie = (page = 1) => {
  return axios
    .get(`trending/movie/week?api_key=${API_KEY}&page=${page}`)
    .then(({ data }) => data.results)
    .catch((err) => {
      throw err;
    });
};

// https://api.themoviedb.org/3/search/movie?api_key=ff289dac182df51deedab30d3c7629dd&query=duna&page=1
export const searchMovie = (query, page = 1) => {
  return axios
    .get(`search/movie?api_key=${API_KEY}&query=${query}&page=${page}`)
    .then(({ data }) => data.results)
    .catch((err) => {
      throw err;
    });
};

// https://api.themoviedb.org/3/movie/56443?api_key=ff289dac182df51deedab30d3c7629dd&language=en-US
export const detailsAboutMovie = (id) => {
  return axios
    .get(`movie/${id}?api_key=${API_KEY}`)
    .then(({ data }) => data.results)
    .catch((err) => {
      throw err;
    });
};

// https://api.themoviedb.org/3/movie/65546/credits?api_key=ff289dac182df51deedab30d3c7629dd
export const creditsMovie = (id) => {
  return axios
    .get(`movie/${id}/credits?api_key=${API_KEY}`)
    .then(({ data }) => data.results)
    .catch((err) => {
      throw err;
    });
};

// https://api.themoviedb.org/3/movie/65546/reviews?api_key=ff289dac182df51deedab30d3c7629dd&page=1
export const reviewsMovie = (id) => {
  return axios
    .get(`movie/${id}/reviews?api_key=${API_KEY}`)
    .then(({ data }) => data.results)
    .catch((err) => {
      throw err;
    });
};
