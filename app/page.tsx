import Header from "@/components/organisms/Header";
import Footer from "@/components/molecules/Footer";
export default function Home() {
	return (
		<>
			<Header />
			<main className="">
				<h2 className="text-xl">Welcome to Maths Advantage</h2>
				<p>Your go-to place for math tutoring!</p>
				<div className="h-[630px]"></div>
				{/* Other content can go here */}
				<Footer />
			</main>
		</>
	);
}
