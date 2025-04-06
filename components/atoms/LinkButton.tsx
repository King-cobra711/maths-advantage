import Link from "next/link";
import { ButtonProps } from "./Button";

interface LinkButtonProps extends ButtonProps {
	href: string;
}

export default function LinkButton({ text, href, className }: LinkButtonProps) {
	return (
		<Link href={href} className={className}>
			{text}
		</Link>
	);
}
