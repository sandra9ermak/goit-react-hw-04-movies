import { Link } from "react-router-dom";
import s from "./Views.module.css"
import { useEffect, useState } from "react";
import { trendMovie } from "../service/api";

const HomePageView = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    trendMovie().then((results) => {
        setMovies(results);
    });
  }, []);
  // console.log(movies);

  return (
    <section className={s.homeSection}>
    <h1 className={s.homeTitle}>Trending today</h1>
    <ul>
        {!!movies.length && movies.map((item) => <li key={item.id} className={s.listItem}><Link to={`/movies/${item.id}`} className={s.linkItem}>{item.title}</Link></li>)}
    </ul>
    </section>
  )
};

export default HomePageView;
