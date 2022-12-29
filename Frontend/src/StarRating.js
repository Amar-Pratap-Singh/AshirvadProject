import React from 'react';

function StarRating(props) {
    return (
        <div className="star-rating">
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <div
                        name="star-button"
                        type="button"
                        key={index}
                        className={index <= (props.hover || props.rating) ? "on" : "off"}
                        onClick={() => props.setRating(index)}
                        onMouseEnter={() => props.setHover(index)}
                        onMouseLeave={() => props.setHover(props.rating)}
                    >
                    <span className="star">&#9733;</span>
                    </div>
                );
            })}
        </div>
    );
};

export default StarRating;
