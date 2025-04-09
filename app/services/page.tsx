import ImageGrid from "@/components/ImageGrid";

export default function Services() {
	const services = [
		{
			image: "/images/asian-smart.jpeg",
			title: "Tutoring",
			description1:
				"Maths Advantage provides mathematics tutoring for students who would benefit from personalised one-to-one assistance.",
			description2:
				"Specialising in High School Mathematics, we provide customised on-going tutoring to ensure each student reaches their mathematical potential.",
		},
		{
			image: "/images/asian-smart.jpeg",
			title: "Exams",
			description1:
				"Exam time can be one of the most stressful periods for high school students.",
			description2:
				"Maths Advantage can help prepare you for your maths exam by providing extra tutoring, additional questions and guidance on the types of questions you may encounter in examinations.",
		},
		{
			image: "/images/asian-smart.jpeg",
			title: "Topics",
			description1:
				"Sometimes all you need is a little help with a particular mathematical topic. ",
			description2:
				"Maths Advantage can provide topic-specific tutoring to get you back on track.",
		},
	];
	return (
		<div>
			<h1 className="text-4xl py-6 text-teal-600">SERVICES</h1>
			<p className="p-1 text-md py-2">
				Maths Advantage aims to provide quality tutoring and exam preparation
				for high school mathematics students.
			</p>
			<p className="p-1 text-md py-2">
				Our goal is to improve your mathematics results and support your journey
				to success.
			</p>
			<ImageGrid services={services} className="py-8" />
		</div>
	);
}
