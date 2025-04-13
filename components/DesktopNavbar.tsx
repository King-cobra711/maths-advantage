import { Enriqueta } from "next/font/google";
import LinkButton from "@/components/LinkButton";

const enriqueta = Enriqueta({
	weight: "400",
	subsets: ["latin"],
});

interface DesktopNavbarProps {
	className?: string;
}

export default function DesktopNavbar({ className }: DesktopNavbarProps) {
	return (
		<div
			className={`flex items-center w-full max-w-7xl mx-auto gap-6 px-10 py-4 lg:px-20 lg:py-4 ${className}`}
		>
			<div className="flex items-center">
				<div className="flex flex-col relative">
					<div
						className="absolute lg:-left-10 lg:top-1 -left-5 top-1 lg:w-9 lg:h-9 w-5 h-5 bg-teal-300 bg-opacity-50 rounded-full z-10 "
						style={{ backgroundColor: "var(--logo-teal)" }}
					></div>
					<div
						className="absolute lg:-left-5 lg:top-1 -left-3 top-1 lg:w-13 lg:h-13 w-8 h-8 rounded-full z-0"
						style={{ backgroundColor: "var(--primary-yellow)" }}
					></div>
					<h1
						className={`text-[24px] md:text-[24px] lg:text-[38px] font-bold text-gray-600 ${enriqueta.className} z-20 whitespace-nowrap`}
					>
						Maths Advantage
					</h1>
					<p className="text-[14px] text-gray-500 md:text-[14px] lg:text-[16px] z-20 whitespace-nowrap">
						Maths Tutoring Specialists
					</p>
				</div>
			</div>
			<nav className="flex justify-between gap-4 md:gap-10 w-full lg:max-w-[50%] md:ml-6 lg:mx-auto text-teal-500 md:text-[14px] lg:text-[14px] font-bold z-10">
				<LinkButton text="HOME" href="/" isNavLink />
				<LinkButton text="ABOUT" href="/about" isNavLink />
				<LinkButton text="CONTACT" href="/contact" isNavLink />
				<LinkButton text="SERVICES" href="/services" isNavLink />
				<LinkButton
					text="FAQ"
					href="/faq"
					className="whitespace-nowrap"
					isNavLink
				/>
			</nav>
		</div>
	);
}
