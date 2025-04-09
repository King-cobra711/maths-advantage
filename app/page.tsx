import Slider from "@/components/organisms/Slider";

export default function Home() {
	return (
		<div className="max-w-[800px] mx-auto">
			<h1 className="text-4xl py-6 text-teal-600 mx-auto text-center">
				Welcome to Maths Advantage
			</h1>
			<p className="text-lg mx-auto text-center">
				Your one stop shop for all your maths needs!
			</p>
			<Slider />
		</div>
	);
}
