import s from "./Views.module.css";
import { reviewsMovie } from "../service/api";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

const Reviews = ({movieId}) => {
    const [reviewMovie, setReviewsMovie] = useState([]);

    useEffect(() => {
        reviewsMovie(movieId).then((results) => {
            setReviewsMovie(results);
        });
    }, [])

    return (
    <>
        {!!reviewMovie.length ? 
            (<ul>
            {reviewMovie.map(item =>
                <li className={s.reviewListItem} key={item.id}>
                    <h4 className={s.reviewListItemTitel}>Author: {item.author}</h4>
                    <p>{ item.content}</p>
                </li>
            )}
            </ul>
        ) : <h1>There is no reviews for this movie</h1> }
    </>
    )
}

export default Reviews;

Reviews.propTypes = {
    reviewMovie: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            author: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired
        }))
}