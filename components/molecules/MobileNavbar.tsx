"use client";

import { Enriqueta } from "next/font/google";
import { useState, useEffect } from "react";
import LinkButton from "@/components/atoms/LinkButton";

const enriqueta = Enriqueta({ weight: "700" });

interface MobileNavbarProps {
	className?: string; // Define the className prop as optional
}

export default function MobileNavbar({ className }: MobileNavbarProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [isVisible, setIsVisible] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		if (isOpen) {
			setIsVisible(true);
		} else {
			const timer = setTimeout(() => {
				setIsVisible(false);
			}, 300);
			return () => clearTimeout(timer);
		}
	}, [isOpen]);

	return (
		<div
			className={`flex items-center w-full max-w-7xl mx-auto gap-6 px-10 py-4 ${className} justify-between`}
		>
			<div className="flex items-center">
				<div className="flex flex-col relative">
					<div
						className="absolute -left-5 top-1 w-5 h-5 bg-teal-300 bg-opacity-50 rounded-full z-10 "
						style={{ backgroundColor: "#3cb2b2bf" }}
					></div>
					<div
						className="absolute -left-3 top-1 w-8 h-8 rounded-full z-0"
						style={{ backgroundColor: "#f2ad2ed4" }}
					></div>
					<h1
						className={`text-[24px] font-bold text-gray-600 ${enriqueta.className} z-20 whitespace-nowrap`}
					>
						Maths Advantage
					</h1>
					<p className="text-[14px] text-gray-500 z-20 whitespace-nowrap">
						Maths Tutoring Specialists
					</p>
				</div>
			</div>
			<div className="relative flex items-center justify-end">
				<button
					onClick={toggleMenu}
					className="lg:hidden flex flex-col items-center"
				>
					<span className="block w-6 h-0.5 bg-gray-600 mb-1"></span>
					<span className="block w-6 h-0.5 bg-gray-600 mb-1"></span>
					<span className="block w-6 h-0.5 bg-gray-600"></span>
				</button>
			</div>
			{isVisible && (
				<div
					className={`absolute top-21 bg-white shadow-lg rounded-lg mt-2 text-gray-600 w-full left-0 transition-all delay-150 duration-300 ease-in-out transform ${
						isOpen
							? "scale-y-100 translate-y-0 opacity-100"
							: "scale-y-0 translate-y-[-20px] opacity-0 pointer-events-none"
					}`}
				>
					<ul className="flex flex-col p-2">
						<LinkButton text="HOME" href="/" className="p-2" />
						<LinkButton text="ABOUT" href="/about" className="p-2" />
						<LinkButton text="CONTACT" href="/contact" className="p-2" />
						<LinkButton text="SERVICES" href="/services" className="p-2" />
						<LinkButton text="Free Stuff" href="/free-stuff" className="p-2" />
					</ul>
				</div>
			)}
		</div>
	);
}
