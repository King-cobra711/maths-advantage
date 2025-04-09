import Link from "next/link";
import { ButtonProps } from "./Button";

interface LinkButtonProps extends ButtonProps {
	href: string;
	onClick?: () => void;
	target?: string;
	rel?: string;
}

export default function LinkButton({
	text,
	href,
	className,
	onClick,
	icon,
	target,
	rel,
}: LinkButtonProps) {
	const isExternalLink = href.startsWith("http") || href.startsWith("https");

	const buttonClasses = `bg-teal-600 text-white py-2 px-6 mx-auto rounded-md cursor-pointer 
		flex items-center justify-center gap-2 ${className || ""}`;

	if (isExternalLink) {
		return (
			<a
				href={href}
				className={buttonClasses}
				onClick={onClick}
				target={target || "_blank"}
				rel={rel || "noopener noreferrer"}
			>
				{icon && icon}
				<span>{text}</span>
			</a>
		);
	}

	return (
		<Link href={href} className={buttonClasses} onClick={onClick}>
			{icon && icon}
			<span>{text}</span>
		</Link>
	);
}
