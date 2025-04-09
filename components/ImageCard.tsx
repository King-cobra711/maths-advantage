import Image from "next/image";

interface ImageCardProps {
	image: string;
	title: string;
	description1: string;
	description2: string;
}

export default function ImageCard({
	image,
	title,
	description1,
	description2,
}: ImageCardProps) {
	return (
		<div className="flex flex-col w-full lg:w-[280px] items-center">
			<div className="flex justify-center w-full">
				<Image
					src={image}
					alt={title}
					width={280}
					height={300}
					className="border border-white"
					style={{ boxShadow: "var(--shd, 0 1px 3px rgba(0, 0, 0, .5))" }}
				/>
			</div>
			<h3 className="text-xl py-5 text-center text-teal-600 font-bold">
				{title}
			</h3>
			<p className="text-sm pb-4 text-center">{description1}</p>
			<p className="text-sm text-center pb-4">{description2}</p>
		</div>
	);
}
