import LinkButton from "@/components/atoms/LinkButton";
import NoticeBoard from "@/components/atoms/NoticeBoard";
import { Facebook } from "@/components/icons/Facebook";
import Slider from "@/components/organisms/Slider";

export default function Home() {
	return (
		<div className="max-w-[800px] mx-auto">
			<h1 className="text-4xl py-6 text-teal-600 mx-auto text-center">
				Welcome to Maths Advantage
			</h1>
			<p className="text-lg mx-auto text-center pb-8">
				Your one stop shop for all your maths needs!
			</p>
			<div className="w-full flex flex-col items-center lg:flex-row gap-4">
				<Slider />
				<div className="w-full flex flex-col items-center gap-4">
					<NoticeBoard className="w-full" text="Limited spaces available" />
					<LinkButton
						text="SERVICES"
						href="/services"
						className="w-full px-18 bg-teal-600 text-white text-center py-2 mx-auto rounded-md cursor-pointer"
					/>
					<LinkButton
						text="FACEBOOK"
						href="https://www.facebook.com/MathsAdvantage/"
						className="w-full px-16 mb-8 bg-teal-600 text-white text-center py-2 mx-auto rounded-md cursor-pointer"
						icon={<Facebook />}
					/>
				</div>
			</div>
		</div>
	);
}
