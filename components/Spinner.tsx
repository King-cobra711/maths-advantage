interface SpinnerProps {
	className?: string;
	size?: string;
	color?: string;
	thickness?: string;
	verticalAlign?: "text-top" | "text-bottom" | "middle" | "unset";
}

export function Spinner({
	className = "",
	size = "50px",
	color = "initial",
	thickness = "7px",
	verticalAlign = "unset",
}: SpinnerProps) {
	return (
		<div
			className={`
				inline-block rounded-full w-[50px] h-[50px]
				border-[7px] border-solid border-gray-200/20
				border-l-secondary
				transform translate-z-0
				animate-spin
				after:rounded-full after:w-[50px] after:h-[50px]
				dark:border-black/20
				${className}
			`}
			style={{
				height: size,
				width: size,
				borderWidth: thickness,
				borderLeftColor: color,
				verticalAlign: verticalAlign,
			}}
		/>
	);
}
