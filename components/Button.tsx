import { ReactNode } from "react";

export interface ButtonProps {
	text: string;
	className?: string;
	icon?: ReactNode;
}

export default function Button({ text, className, icon }: ButtonProps) {
	return (
		<div
			role="button"
			className={`bg-teal-600 text-white py-2 px-6 mx-auto rounded-md cursor-pointer 
				flex items-center justify-center gap-2
				${className}`}
		>
			{icon && icon}
			<span>{text}</span>
		</div>
	);
}
