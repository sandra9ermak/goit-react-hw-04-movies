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

  return (
    <section className={s.homeSection}>
      <h1 className={s.homeTitle}>Trending today</h1>
      <div className={s.homeListDiv}>
        {!!movies.length && movies.map((item) => <div key={item.id} className={s.listHomeItem}><Link to={`/movies/${item.id}`} className={s.linkItem}>
          <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title} width="280" height="400" />
          <p className={s.liTitle}>{item.title}</p>
          </Link>
          <p className={s.liDate}>{new Date(item.release_date).getFullYear()}</p>
        </div>)}
    </div>
    </section>
  )
};

export default HomePageView;
