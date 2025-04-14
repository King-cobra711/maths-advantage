"use client";
import { Enriqueta } from "next/font/google";
import LinkButton from "@/components/LinkButton";
import { useState } from "react";
import Link from "next/link";

const enriqueta = Enriqueta({
	weight: "400",
	subsets: ["latin"],
});

interface MobileNavbarProps {
	className?: string;
}

export default function MobileNavbar({ className }: MobileNavbarProps) {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const closeMenu = () => {
		setIsOpen(false);
	};

	return (
		<div
			className={`flex items-center w-full max-w-7xl mx-auto gap-6 px-10 py-4 ${className} justify-between`}
		>
			<Link href="/">
				<div className="flex items-center">
					<div className="flex flex-col relative">
						<div
							className="absolute -left-5 top-1 w-5 h-5 bg-teal-300 bg-opacity-50 rounded-full z-10 "
							style={{ backgroundColor: "var(--logo-teal)" }}
						></div>
						<div
							className="absolute -left-3 top-1 w-8 h-8 rounded-full z-0"
							style={{ backgroundColor: "var(--primary-yellow)" }}
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
			</Link>
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
			<div
				className={`absolute top-21 bg-white shadow-lg rounded-lg mt-2 text-gray-600 w-full left-0 ${
					isOpen ? "opacity-100 z-20" : "opacity-0 pointer-events-none hidden"
				}`}
			>
				<ul className="flex flex-col items-center p-2">
					<LinkButton
						text="HOME"
						href="/"
						className="p-2 text-center w-full text-teal-500"
						onClick={closeMenu}
					/>
					<LinkButton
						text="ABOUT"
						href="/about"
						className="p-2 text-center w-full text-teal-500"
						onClick={closeMenu}
					/>
					<LinkButton
						text="CONTACT"
						href="/contact"
						className="p-2 text-center w-full text-teal-500"
						onClick={closeMenu}
					/>
					<LinkButton
						text="SERVICES"
						href="/services"
						className="p-2 text-center w-full text-teal-500"
						onClick={closeMenu}
					/>
					<LinkButton
						text="FAQ"
						href="/faq"
						className="p-2 text-center w-full text-teal-500"
						onClick={closeMenu}
					/>
				</ul>
			</div>
		</div>
	);
}
