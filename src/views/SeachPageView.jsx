import { useEffect, useState } from "react";
import { searchMovie } from "../service/api";
import { Link } from "react-router-dom";
import s from "./Views.module.css";
import { useHistory, useLocation } from "react-router";
import queryString from 'query-string';
import Notiflix from "notiflix";

const MoviesPageView = () => {
  const [searchForm, setSearchForm] = useState("");
  const [inputQuery, setInputQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const location = useLocation();
  const history = useHistory();

  // const queryParams = queryString.parse(location.search);
  // history.push({
  //   pathname: location.pathname,
  //   search: `query=${query}`
  // })
  const queryChange = (query) => {
    console.log(location);
    history.push({
      ...location,
      search: `query=${query}`
    })
  }

  useEffect(() => {
    if (searchForm) {
      searchMovie(inputQuery).then((results) => {
        if (results.length === 0) {
          return Notiflix.Notify.failure(`There is no results with ${inputQuery.toUpperCase()} request`);
        } else {
          setMovies(results);
        }
      });
    }
    }, [inputQuery, searchForm]);
  // }, useHistory.push(...location[ inputQuery]));

   const submitSearchForm = (e) => {
    e.preventDefault();
    setSearchForm(inputQuery);
    if (inputQuery !== searchForm) {
      setPage(1);
      setMovies([]);
     }
     if (inputQuery.trim() === "") {
       return Notiflix.Notify.warning("Please enter something!");
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
        <ul className={s.searchList}>
                {!!movies.length && movies.map((item) => <li key={item.id} className={s.listItem}><Link to={`/movies/${item.id}`} className={s.linkItem}>{item.title}</Link></li>
            )}
            </ul>
      </div>
      </section>
    )
}

export default MoviesPageView;