import React, { useState, useEffect } from 'react';

const Carousel = ({ images }) => {
	const [ current, setCurrent ] = useState(0);
	const length = images.length;

	useEffect(
		() => {
			if (length > 1) {
				while (current <= length - 1) {
					let interval = setInterval(() => {
						setCurrent((current) => current + 1);
					}, 6000);
					return () => clearInterval(interval);
				}
				setCurrent(0);
			}
		},
		[ length, current ]
	);

	const prevSlide = () => {
		setCurrent(current === 0 ? length - 1 : current - 1);
	};
	const nextSlide = () => {
		setCurrent(current === length - 1 ? 0 : current + 1);
	};

	if (!Array.isArray(images) || images.length === 0) {
		return null;
	}

	return (
		<div className="carousel mx-auto">
			<button className="button" id="prevSlide" onClick={prevSlide}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="30"
					height="30"
					fill="currentColor"
					className="bi bi-chevron-compact-right"
					viewBox="0 0 16 16"
				>
					<path
						fillRule="evenodd"
						d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"
					/>
				</svg>
			</button>
			<button className="button" id="nextSlide" onClick={nextSlide}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="30"
					height="30"
					fill="currentColor"
					className="bi bi-chevron-compact-left"
					viewBox="0 0 16 16"
				>
					<path
						fillRule="evenodd"
						d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z"
					/>
				</svg>
			</button>

			<div className="img-container" id="imgs">
				{images.map((image, index) => (
					<div className={index === current ? 'slide active' : 'slide'} key={index}>
						{index === current && <img className="carousel-image" src={image.path} alt={image.filename} />}
					</div>
				))}
			</div>
		</div>
	);
};

export default Carousel;
