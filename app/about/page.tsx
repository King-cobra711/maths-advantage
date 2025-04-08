import Image from "next/image";

export default function About() {
	return (
		<div>
			<h1 className="text-4xl py-6 text-teal-600">ABOUT</h1>
			<p className="p-1 text-md py-2">
				Maths Advantage provides customised mathematics tutoring for high school
				students. Our goal is to assist students in reaching their mathematical
				potential.
			</p>
			<p className="p-1 text-md py-2">
				Tuition is provided on either a one-to-one or small group basis with a
				qualified teacher.
			</p>
			<div className="flex flex-col lg:flex-row justify-center space-x-4 pt-8">
				<div className="max-w-md mx-auto">
					<div className="bg-teal-600 text-white p-4 sm:p-6 rounded-lg shadow-lg">
						<div className="flex">
							<Image
								src="/images/asian-smart.jpeg"
								alt="Small Group Tutoring"
								width={150}
								height={150}
								className="rounded border border-white"
							/>
							<div className="flex flex-col justify-center mx-auto">
								<h3 className="text-lg sm:text-xl">One-to-One</h3>
								<p>Tutoring</p>
							</div>
						</div>
					</div>
					<p className="mt-10 text-teal-700 mb-10">
						One-to-one tutoring provides students with personalised lessons
						created specifically for their needs.
					</p>
				</div>
				<div className="max-w-md mx-auto">
					<div
						style={{ backgroundColor: "#f2ad2e" }}
						className="text-white p-4 sm:p-6 rounded-lg shadow-lg"
					>
						<div className="flex">
							<Image
								src="/images/asian-smart.jpeg"
								alt="Small Group Tutoring"
								width={150}
								height={150}
								className="rounded border border-white"
							/>
							<div className="flex flex-col justify-center mx-auto">
								<h3 className="text-lg sm:text-xl">Small Group</h3>
								<p>Tutoring</p>
							</div>
						</div>
					</div>
					<p className="mt-10 text-teal-700 mb-10">
						Older students often benefit from a small group tutoring session
						with their friends. Small group tutoring is an ideal way to
						encourage senior students to form study groups outside normal
						tutoring times.
					</p>
				</div>
			</div>
		</div>
	);
}
