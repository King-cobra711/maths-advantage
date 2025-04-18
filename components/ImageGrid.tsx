import ImageCard from "@/components/ImageCard";
import Divider from "@/components/Divider";

interface ImageGridProps {
	services: {
		image: string;
		title: string;
		description1: string;
		description2: string;
	}[];
	className?: string;
}

export default function ImageGrid({ services, className }: ImageGridProps) {
	return (
		<div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${className}`}>
			{services.map((service, index) => (
				<div key={index} className="flex flex-col items-center">
					<ImageCard
						key={index}
						image={service.image}
						title={service.title}
						description1={service.description1}
						description2={service.description2}
					/>
					{index < services.length - 1 && (
						<Divider className="block lg:hidden" />
					)}
				</div>
			))}
		</div>
	);
}
