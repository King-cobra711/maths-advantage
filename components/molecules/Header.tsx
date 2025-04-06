import LinkButton from "@/components/atoms/LinkButton";
import { Enriqueta } from "next/font/google";

const enriqueta = Enriqueta({ weight: "700" });

export default function Header() {
	return (
		<header className="flex items-center px-[110px] py-5 bg-white w-full reletive">
			<div
				className="absolute left-1/20 top-5 w-10 h-10 bg-teal-300 bg-opacity-50 rounded-full z-10"
				style={{ backgroundColor: "#3cb2b2bf" }}
			></div>
			<div
				className="absolute left-1/15 top-4 w-15 h-15 rounded-full z-0"
				style={{ backgroundColor: "#f2ad2ed4" }}
			></div>
			<div className="flex items-center">
				<div className="relative flex flex-col">
					{/* <div className="absolute left-1/100 top-0 w-20 h-20 bg-teal-300 bg-opacity-50 rounded-full z-10"></div>
					<div className="absolute left-1/6 top-0 w-24 h-24 bg-yellow-300 rounded-full z-0"></div> */}
					<div className="flex flex-col">
						<h1
							className={`text-[38px] font-bold text-gray-600 ${enriqueta.className} relative z-20`}
						>
							Maths Advantage
						</h1>
						<p className="text-sm text-gray-500 text-[18px] relative z-20">
							Maths Tutoring Specialists
						</p>
					</div>
				</div>
			</div>
			<div className="flex-grow flex justify-center">
				<nav className="flex gap-20">
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
						className="text-teal-500 text-[14px] font-bold"
					/>
				</nav>
			</div>
		</header>
	);
}
