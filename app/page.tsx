import Header from "@/components/organisms/Header";

export default function Home() {
	return (
		<>
			<Header />
			<main className="p-5">
				<h2 className="text-xl">Welcome to Maths Advantage</h2>
				<p>Your go-to place for math tutoring!</p>
				{/* Other content can go here */}
			</main>
		</>
	);
}
