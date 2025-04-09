"use client";

import { useState, useEffect, useRef } from "react";
import "./styles/slider.css";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";

const Slider = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [loaded, setLoaded] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const slides = [
		{ src: "/images/home-slider-1.avif", alt: "Slide 1", priority: true },
		{ src: "/images/home-slider-2.avif", alt: "Slide 2" },
		{ src: "/images/home-slider-1.avif", alt: "Slide 3" },
		{ src: "/images/home-slider-3.avif", alt: "Slide 4" },
		{ src: "/images/home-slider-1.avif", alt: "Slide 5" },
		{ src: "/images/home-slider-4.avif", alt: "Slide 6" },
		{ src: "/images/home-slider-1.avif", alt: "Slide 7" },
		{ src: "/images/home-slider-5.avif", alt: "Slide 8" },
		{ src: "/images/home-slider-1.avif", alt: "Slide 9" },
		{ src: "/images/home-slider-6.avif", alt: "Slide 10" },
		{ src: "/images/home-slider-1.avif", alt: "Slide 11" },
		{ src: "/images/home-slider-7.avif", alt: "Slide 12" },
	];

	const sliderOptions = {
		slides: {
			perView: 1,
			spacing: 0,
		},
		loop: true,
		defaultAnimation: {
			duration: 2000,
		},
		slideChanged(s: any) {
			setCurrentSlide(s.track.details.rel);
		},
		created() {
			setLoaded(true);
		},
	};

	const [sliderRef, instanceRef] = useKeenSlider(sliderOptions);

	useEffect(() => {
		if (containerRef.current) {
			const resizeObserver = new ResizeObserver(() => {
				if (instanceRef.current) {
					instanceRef.current.update();
				}
			});

			resizeObserver.observe(containerRef.current);

			return () => {
				if (containerRef.current) {
					resizeObserver.unobserve(containerRef.current);
				}
			};
		}
	}, [instanceRef]);

	useEffect(() => {
		const interval = setInterval(() => {
			if (instanceRef.current) {
				instanceRef.current.next();
			}
		}, 4000);

		return () => {
			clearInterval(interval);
		};
	}, [instanceRef]);

	return (
		<div
			ref={containerRef}
			className="w-full lg:w-[600px] mx-auto px-4 lg:px-0"
		>
			<div className="navigation-wrapper">
				<div ref={sliderRef} className="keen-slider">
					{slides.map((slide, index) => (
						<div className="keen-slider__slide" key={index}>
							<div
								style={{ position: "relative", width: "100%", height: "100%" }}
							>
								<Image
									src={slide.src}
									alt={slide.alt}
									fill
									style={{ objectFit: "cover" }}
									priority={slide.priority}
								/>
							</div>
						</div>
					))}
				</div>
				{loaded && instanceRef.current && (
					<>
						<Arrow
							left
							onClick={(e: any) =>
								e.stopPropagation() || instanceRef.current?.prev()
							}
							disabled={currentSlide === 0}
						/>

						<Arrow
							onClick={(e: any) =>
								e.stopPropagation() || instanceRef.current?.next()
							}
							disabled={
								currentSlide ===
								instanceRef.current.track.details.slides.length - 1
							}
						/>
					</>
				)}
			</div>
			{loaded && instanceRef.current && (
				<div className="dots">
					{[
						...Array(instanceRef.current.track.details.slides.length).keys(),
					].map((idx) => {
						return (
							<button
								key={idx}
								onClick={() => {
									instanceRef.current?.moveToIdx(idx);
								}}
								className={"dot" + (currentSlide === idx ? " active" : "")}
							></button>
						);
					})}
				</div>
			)}
		</div>
	);
};

function Arrow(props: {
	disabled: boolean;
	left?: boolean;
	onClick: (e: any) => void;
}) {
	const disabled = props.disabled ? " arrow--disabled" : "";
	return (
		<svg
			onClick={props.onClick}
			className={`arrow ${
				props.left ? "arrow--left" : "arrow--right"
			} ${disabled}`}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
		>
			{props.left && (
				<path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
			)}
			{!props.left && (
				<path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
			)}
		</svg>
	);
}

export default Slider;
