import { Pin } from "@/components/icons/Pin";
import { PhoneIcon } from "@/components/icons/PhoneIcon";

export default function NoticeBoard({
	className,
	text,
}: {
	className?: string;
	text: string;
}) {
	return (
		<div
			className={`bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200
		  backdrop-filter backdrop-blur-sm bg-opacity-90 relative
		  ${className}`}
		>
			<div className="absolute -top-2 -right-0 transform rotate-12 hover:rotate-[135deg] hover:scale-110 transition-all duration-300">
				<Pin
					className="w-8 h-8 drop-shadow-[3px_3px_3px_rgba(0,0,0,0.4)]"
					fill="#3B82F6"
				/>
			</div>
			<p className="text-center text-teal-800">{text}</p>

			<div className="flex flex-col text-center mt-4">
				<p className="text-red-500 text-center">Book Now!</p>
				<a
					href="tel:0409896761"
					className="flex items-center mt-2 mx-auto hover:text-blue-600 transition-colors"
				>
					<PhoneIcon className="pt-1" />
					<p>0409 896 761</p>
				</a>
			</div>
		</div>
	);
}
