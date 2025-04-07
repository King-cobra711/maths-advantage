import { MapPin } from "@/components/icons/MapPin";
import { PhoneIcon } from "@/components/icons/PhoneIcon";
import { Email } from "@/components/icons/Email";
export default function Footer() {
	return (
		<footer
			className="w-full text-white"
			style={{ backgroundColor: "#3cb2b2bf" }}
		>
			<div className="mx-auto max-w-7xl">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 mx-auto px-5 py-10 max-w-7xl text-[12px] lg:text-[16px] justify-items-start">
					<div className="flex items-start gap-2 break-words text-left">
						<span className="mt-1">
							<MapPin size={20} />
						</span>
						<div>
							<p>Location</p>
							<p>Brisbane, Qld, Australia</p>
						</div>
					</div>
					<div className="flex items-start gap-2 break-words text-left">
						<span className="mt-1">
							<PhoneIcon />
						</span>
						<div>
							<p>Call</p>
							<p>T: 0409 896 761</p>
						</div>
					</div>
					<div className="flex items-start gap-2 break-words text-left">
						<span>
							<Email />
						</span>
						<div>
							<p>Contact</p>
							<p>info@mathsadvantage.com.au</p>
						</div>
					</div>
					<div className="flex items-center gap-2 break-words text-left">
						<div className="text-2xl -mt-5">&#169;</div>
						<div>
							<p>2019 by</p>
							<p>Maths Advantage</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
