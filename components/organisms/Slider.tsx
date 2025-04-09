"use client";

import React, { useState, useEffect } from "react";
import "./slider.css";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";

const Slider = () => {
	const [currentSlide, setCurrentSlide] = React.useState(0);
	const [loaded, setLoaded] = useState(false);
	const [sliderRef, instanceRef] = useKeenSlider({
		slides: {
			perView: 1,
			spacing: 0,
		},
		loop: true,
		defaultAnimation: {
			duration: 2000, // Animation duration when sliding
		},
		slideChanged(slider) {
			setCurrentSlide(slider.track.details.rel);
		},
		created() {
			setLoaded(true);
		},
	});

	useEffect(() => {
		const interval = setInterval(() => {
			if (instanceRef.current) {
				instanceRef.current.next();
			}
		}, 4000); // Time between slide changes (4 seconds)

		return () => {
			clearInterval(interval);
		};
	}, [instanceRef]);

	return (
		<div className="w-[600px] py-6">
			<div className="navigation-wrapper">
				<div ref={sliderRef} className="keen-slider">
					<div className="keen-slider__slide">
						<div
							style={{ position: "relative", width: "100%", height: "420px" }}
						>
							<Image
								src="/images/home-slider-1.avif"
								alt="Slide 1"
								fill
								style={{ objectFit: "cover" }}
								priority // Add priority to the first image
							/>
						</div>
					</div>
					<div className="keen-slider__slide">
						<div
							style={{ position: "relative", width: "100%", height: "420px" }}
						>
							<Image
								src="/images/home-slider-2.avif"
								alt="Slide 2"
								fill
								style={{ objectFit: "cover" }}
							/>
						</div>
					</div>
					<div className="keen-slider__slide">
						<div
							style={{ position: "relative", width: "100%", height: "420px" }}
						>
							<Image
								src="/images/home-slider-1.avif"
								alt="Slide 3"
								fill
								style={{ objectFit: "cover" }}
								priority // Add priority to the first image
							/>
						</div>
					</div>
					<div className="keen-slider__slide">
						<div
							style={{ position: "relative", width: "100%", height: "420px" }}
						>
							<Image
								src="/images/home-slider-3.avif"
								alt="Slide 4"
								fill
								style={{ objectFit: "cover" }}
							/>
						</div>
					</div>
					<div className="keen-slider__slide">
						<div
							style={{ position: "relative", width: "100%", height: "420px" }}
						>
							<Image
								src="/images/home-slider-1.avif"
								alt="Slide 5"
								fill
								style={{ objectFit: "cover" }}
								priority // Add priority to the first image
							/>
						</div>
					</div>
					<div className="keen-slider__slide">
						<div
							style={{ position: "relative", width: "100%", height: "420px" }}
						>
							<Image
								src="/images/home-slider-4.avif"
								alt="Slide 6"
								fill
								style={{ objectFit: "cover" }}
							/>
						</div>
					</div>
					<div className="keen-slider__slide">
						<div
							style={{ position: "relative", width: "100%", height: "420px" }}
						>
							<Image
								src="/images/home-slider-1.avif"
								alt="Slide 7"
								fill
								style={{ objectFit: "cover" }}
								priority // Add priority to the first image
							/>
						</div>
					</div>
					<div className="keen-slider__slide">
						<div
							style={{ position: "relative", width: "100%", height: "420px" }}
						>
							<Image
								src="/images/home-slider-5.avif"
								alt="Slide 8"
								fill
								style={{ objectFit: "cover" }}
							/>
						</div>
					</div>
					<div className="keen-slider__slide">
						<div
							style={{ position: "relative", width: "100%", height: "420px" }}
						>
							<Image
								src="/images/home-slider-1.avif"
								alt="Slide 9"
								fill
								style={{ objectFit: "cover" }}
								priority // Add priority to the first image
							/>
						</div>
					</div>
					<div className="keen-slider__slide">
						<div
							style={{ position: "relative", width: "100%", height: "420px" }}
						>
							<Image
								src="/images/home-slider-6.avif"
								alt="Slide 10"
								fill
								style={{ objectFit: "cover" }}
							/>
						</div>
					</div>
					<div className="keen-slider__slide">
						<div
							style={{ position: "relative", width: "100%", height: "420px" }}
						>
							<Image
								src="/images/home-slider-1.avif"
								alt="Slide 11"
								fill
								style={{ objectFit: "cover" }}
								priority // Add priority to the first image
							/>
						</div>
					</div>
					<div className="keen-slider__slide">
						<div
							style={{ position: "relative", width: "100%", height: "420px" }}
						>
							<Image
								src="/images/home-slider-7.avif"
								alt="Slide 12"
								fill
								style={{ objectFit: "cover" }}
							/>
						</div>
					</div>
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
