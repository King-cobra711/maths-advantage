import LinkButton from "@/components/atoms/LinkButton";
import { Enriqueta } from "next/font/google";

const enriqueta = Enriqueta({ weight: "700" });

export default function Header() {
	return (
		<header className="bg-white">
			<div className="flex items-center w-full max-w-7xl mx-auto gap-6 px-20 py-4">
				<div className="flex items-center">
					<div className="flex flex-col relative">
						<div
							className="absolute -left-10 top-1 w-9 h-9 bg-teal-300 bg-opacity-50 rounded-full z-10 "
							style={{ backgroundColor: "#3cb2b2bf" }}
						></div>
						<div
							className="absolute -left-5 top-1 w-13 h-13 rounded-full z-0"
							style={{ backgroundColor: "#f2ad2ed4" }}
						></div>
						<h1
							className={`text-[24px] lg:text-[38px] font-bold text-gray-600 ${enriqueta.className} z-20 whitespace-nowrap`}
						>
							Maths Advantage
						</h1>
						<p className="text-[14px] text-gray-500 md:text-[18px] z-20 whitespace-nowrap">
							Maths Tutoring Specialists
						</p>
					</div>
				</div>
				<nav className="flex justify-between gap-4 md:gap-10 w-full max-w-[50%] lg:mx-auto">
					<LinkButton
						text="HOME"
						href="/"
						className="text-teal-500 text-[14px] font-bold"
					/>
					<LinkButton
						text="ABOUT"
						href="/about"
						className="text-teal-500 text-[14px] font-bold"
					/>
					<LinkButton
						text="CONTACT"
						href="/contact"
						className="text-teal-500 text-[14px] font-bold"
					/>
					<LinkButton
						text="SERVICES"
						href="/services"
						className="text-teal-500 text-[14px] font-bold"
					/>
					<LinkButton
						text="Free Stuff"
						href="/free-stuff"
						className="text-teal-500 text-[14px] font-bold whitespace-nowrap"
					/>
				</nav>
			</div>
		</header>
	);
}
