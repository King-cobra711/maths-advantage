"use client";

import Link from "next/link";
import { ButtonProps } from "./Button";
import { usePathname } from "next/navigation";

interface LinkButtonProps extends ButtonProps {
	href: string;
	onClick?: () => void;
	target?: string;
	rel?: string;
	isNavLink?: boolean;
}

export default function LinkButton({
	text,
	href,
	className,
	onClick,
	icon,
	target,
	rel,
	isNavLink = false,
}: LinkButtonProps) {
	const pathname = usePathname();
	const isActive = pathname === href;

	const isExternalLink = href.startsWith("http") || href.startsWith("https");

	const baseClasses = `relative cursor-pointer 
		flex items-center justify-center gap-2 ${className || ""}`;

	if (isExternalLink) {
		return (
			<a
				href={href}
				className={baseClasses}
				onClick={onClick}
				target={target || "_blank"}
				rel={rel || "noopener noreferrer"}
			>
				{icon && icon}
				<span>{text}</span>
				<div
					className={`absolute -bottom-1 left-0 w-full h-0.5 bg-teal-500 transition-transform duration-300 origin-left ${
						isActive ? "scale-x-100" : "scale-x-0"
					}`}
				/>
			</a>
		);
	}

	return (
		<Link href={href} className={baseClasses} onClick={onClick}>
			{icon && icon}
			<span>{text}</span>
			{isNavLink && (
				<div
					className={`absolute -bottom-1 left-0 w-full h-0.5 transition-transform duration-300 origin-left ${
						isActive ? "scale-x-100" : "scale-x-0"
					}`}
					style={{ backgroundColor: "#f2ad2ed4" }}
				/>
			)}
		</Link>
	);
}
