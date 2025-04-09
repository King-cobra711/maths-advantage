"use client";
import React, { useState } from "react";
import { ChevronRight } from "@/components/icons/ChevronRight";
import { ChevronDown } from "@/components/icons/ChevronDown";
import { AccordionItemOne } from "@/components/__fixtures__/Accordion/ItemOne";
import { AccordionItemTwo } from "@/components/__fixtures__/Accordion/ItemTwo";
import { AccordionItemThree } from "@/components/__fixtures__/Accordion/ItemThree";
interface AccordionItem {
	title: string;
	content: React.ReactNode;
}

const Accordion: React.FC<{ items: AccordionItem[] }> = ({ items }) => {
	return (
		<div className="space-y-2 lg:w-[800px]">
			{items.map((item, index) => (
				<AccordionItemComponent
					key={index}
					title={item.title}
					content={item.content}
				/>
			))}
		</div>
	);
};

const AccordionItemComponent: React.FC<AccordionItem> = ({
	title,
	content,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="border border-gray-300 rounded-lg">
			<div
				className="flex justify-between items-center p-4 cursor-pointer"
				onClick={() => setIsOpen(!isOpen)}
			>
				<span className="text-lg font-medium">{title}</span>
				{isOpen ? <ChevronDown size="24" /> : <ChevronRight size="24" />}
			</div>
			{isOpen && <div className="p-4 bg-gray-100">{content}</div>}
		</div>
	);
};

const dummyItems = [
	{
		title: "What is the order of operations?",
		content: <AccordionItemOne />,
	},
	{
		title: 'Is the calculator "%" button really magic?',
		content: <AccordionItemTwo />,
	},
	{
		title: "6 ÷ 2(1 + 2) = 1 or 9?",
		content: <AccordionItemThree />,
	},
];

export default function App() {
	return <Accordion items={dummyItems} />;
}
