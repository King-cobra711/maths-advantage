interface DividerProps {
	className?: string;
}

export default function Divider({ className }: DividerProps) {
	return <div className={`w-full h-[1px] bg-gray-300 ${className}`} />;
}
