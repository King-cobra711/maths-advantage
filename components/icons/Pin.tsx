import type { ReactElement } from "react";
import type { IconProps } from "./types";

export function Pin({
	className,
	width = 10,
	height = 15,
	viewBox = "0 0 10 15",
	fill = "#3B82F6",
}: IconProps): ReactElement {
	return (
		<svg
			width={width}
			height={height}
			viewBox={viewBox}
			className={className}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M1.14908 0.136876C1.19094 0.0933741 1.24063 0.0588946 1.2953 0.0354086C1.34997 0.0119226 1.40854 -0.000109265 1.46768 7.4765e-07L7.76768 7.4765e-07C7.88702 7.4765e-07 8.00148 0.0493868 8.08587 0.137294C8.17027 0.225202 8.21768 0.344431 8.21768 0.468751C8.21768 1.10625 7.90988 1.56938 7.63628 1.85531C7.52288 1.9725 7.41128 2.06531 7.31768 2.13469L7.31768 6.28875L7.38788 6.33375C7.57058 6.45281 7.81628 6.62813 8.06378 6.85406C8.54168 7.28906 9.11768 7.99406 9.11768 8.90625C9.11768 9.03057 9.07027 9.1498 8.98587 9.23771C8.90148 9.32562 8.78702 9.375 8.66768 9.375L5.06768 9.375L5.06768 13.5938C5.06768 13.8525 4.86608 15 4.61768 15C4.36928 15 4.16768 13.8525 4.16768 13.5938L4.16768 9.375H0.567676C0.448328 9.375 0.333869 9.32562 0.249478 9.23771C0.165086 9.1498 0.117676 9.03057 0.117676 8.90625C0.117676 7.99406 0.693676 7.28906 1.17068 6.85406C1.40351 6.64347 1.65344 6.45432 1.91768 6.28875L1.91768 2.13469C1.80418 2.05098 1.69761 1.95753 1.59908 1.85531C1.32548 1.56938 1.01768 1.10531 1.01768 0.468751C1.01757 0.407152 1.02912 0.346136 1.05167 0.289191C1.07421 0.232245 1.10731 0.180487 1.14908 0.136876Z"
				fill={fill}
			/>
		</svg>
	);
}
