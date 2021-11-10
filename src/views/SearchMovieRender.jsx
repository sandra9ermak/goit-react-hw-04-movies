import { Link } from "react-router-dom";
import s from "./Views.module.css"
import { useEffect, useState } from "react";

const SerachMovieRender = ({ movies }) => {
    return (
        <>
            <ul>
            {!!movies.length && movies.map((item) => <li key={item.id} className={s.listItem}><Link to={`/movies/${item.id}`} className={s.linkItem}>{item.title}</Link></li>
            )}
            </ul>
        </>
    )
}

export default SerachMovieRender;