import Link from "next/link";
import { ButtonProps } from "./Button";

interface LinkButtonProps extends ButtonProps {
	href: string;
	onClick?: () => void;
}

export default function LinkButton({
	text,
	href,
	className,
	onClick,
}: LinkButtonProps) {
	return (
		<Link href={href} className={className} onClick={onClick}>
			{text}
		</Link>
	);
}
