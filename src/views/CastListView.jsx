import s from "./Views.module.css";
import { creditsMovie } from "../service/api";
import { useEffect, useState } from "react";
import defaultImg from "../img/defaultImg.jpg"

const CastList = ({movieId}) => {
    const [castMovie, setCastMovie] = useState([]);

    useEffect(() => {
        creditsMovie(movieId).then((results) => {
            setCastMovie(results);
        });
    }, [])

    return (
        <section className={s.castSection}>
            {!!castMovie.length ?
                (castMovie.map(item =>
                    <div className={s.castListItem} key={item.id}>
                        <img src={item.profile_path ? `https://image.tmdb.org/t/p/w500${item.profile_path}` : defaultImg} alt={item.title} width="100" height="150" />
                        <h4>{item.name}</h4>
                        <p>Character: { item.character}</p>
                    </div>
                )
                ) : <h1>There is no cast for this movie</h1>}
        </section>
    )
}

export default CastList;