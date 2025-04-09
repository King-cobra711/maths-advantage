export interface ButtonProps {
	text: string;
	className?: string;
}

export default function Button({ text, className }: ButtonProps) {
	return <div className={className}>{text}</div>;
}
