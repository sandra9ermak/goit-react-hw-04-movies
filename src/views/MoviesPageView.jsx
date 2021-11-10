import { useEffect, useState } from "react";
import { searchMovie } from "../service/api";
import SerachMovieRender from "./SearchMovieRender";
import s from "./Views.module.css"

const MoviesPageView = () => {
  const [searchForm, setSearchForm] = useState("");
  const [inputQuery, setInputQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (searchForm) {
      searchMovie(inputQuery).then((results) => {
          setMovies(results);
      });
    }
  }, [searchForm]);
  // console.log(movies);

   const submitSearchForm = (e) => {
    e.preventDefault();
    setSearchForm(inputQuery);
    if (inputQuery !== searchForm) {
      setPage(1);
      setMovies([]);
    }
  };

  const handleChange = (e) => {
    setInputQuery(e.target.value);
  };

  return (
      <section className={s.form}>
        <form className={s.searchForm} onSubmit={submitSearchForm}>
        <input
          onChange={handleChange}
          className={s.inputForm}
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search movies"
        />
      <button type="submit" className={s.searchButton}>Search
      </button>
      </form>
      <div>
        <SerachMovieRender movies={movies}></SerachMovieRender>
      </div>
      </section>
    )
}

export default MoviesPageView;