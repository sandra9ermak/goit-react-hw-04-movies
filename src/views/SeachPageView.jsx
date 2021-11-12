import { useEffect, useState } from "react";
import { searchMovie } from "../service/api";
import { Link } from "react-router-dom";
import s from "./Views.module.css";
import { useHistory, useLocation } from "react-router";
import queryString from 'query-string';
import Notiflix from "notiflix";
import PropTypes from "prop-types";
import SearchForm from "../components/SearchForm/SearchForm";

const SearchPageView = () => {
  const [inputQuery, setInputQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const history = useHistory();
  const parsedQuery = queryString.parse(location.search).query;
  
  useEffect(() => {
    if (location.search) {
      searchMovie(parsedQuery).then((results) => {
        if (results.length === 0) {
          return Notiflix.Notify.failure(
            `There is no results with ${parsedQuery.toUpperCase()} request`
            );
          } else {
            setMovies(results);
          }
        });
      }
    }, [location, parsedQuery])
    
  const submitSearchForm = (e) => {
    e.preventDefault();
    if (inputQuery.trim() === "") {
      return Notiflix.Notify.warning("Please enter something!");
    }
    history.push({ ...history.location, search: `?query=${inputQuery}` });
  };
  
  const handleChange = (e) => {
    setInputQuery(e.target.value);
  };

  return (
    <section className={s.form}>
      <SearchForm onSubmit={submitSearchForm} onChange={handleChange} />
      <div>
        <ul className={s.searchList}>
          {!!movies.length &&
            movies.map((item) => (
              <li key={item.id} className={s.listItem}>
                <Link to={{
                  pathname: `/movies/${item.id}`,
                  state: { from: location },
                }} className={s.linkItem}>
                  {item.title}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default SearchPageView;

SearchPageView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
};
