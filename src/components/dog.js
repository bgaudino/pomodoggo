import React from 'react';
import '../App.css';

export const Dog = (props) => {
    return (
        <figure className="figure text-center">
            <img src={props.source} id="dog" className="figure-img img-thumbnail rounded shadow-sm" alt="Dog" />
            <figcaption className="figure-caption">{props.breed}</figcaption>
        </figure>
    )
}