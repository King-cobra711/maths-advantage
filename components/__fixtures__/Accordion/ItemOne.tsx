import Image from "next/image";

export const AccordionItemOne = () => {
	return (
		<div className="p-4">
			<h2 className="text-2xl mb-4">Order of Operations</h2>
			<p className="mb-4">
				In mathematics, operations are things like add, subtract, multiply,
				divide, brackets and powers. There are rules about the order in which
				these operations are done. Get the order wrong, and you will get the
				answer wrong!
			</p>
			<div className="flex justify-center my-10">
				<Image
					src="/images/OperationsThinkFace.jpg"
					alt="Order of Operations Most people get this wrong"
					width={400}
					height={400}
					className="rounded-md"
				/>
			</div>
			<h3 className="mt-4 mb-2 font-bold">What should we do first?</h3>
			<ol className="mb-4 list-decimal list-inside">
				<li>Brackets (deal with what is inside the brackets first)</li>
				<li>Orders (things like powers and square roots)</li>
				<li>Multiply and Divide (left to right)</li>
				<li>Add and Subtract (left to right)</li>
			</ol>
			<div className="flex justify-center my-10">
				<Image
					src="/images/Operations BODMAS.png"
					alt="Order of Operations BODMAS"
					width={400}
					height={400}
					className="rounded-md"
				/>
			</div>
			<h3 className="mt-4 mb-2 font-bold">
				Let's work through our example question:
			</h3>
			<div className="flex justify-center my-10">
				<Image
					src="/images/Operations BODMAS Example.jpg"
					alt="Order of Operations Example"
					width={400}
					height={400}
					className="rounded-md"
				/>
			</div>
			<p className="mt-4">
				The answer is 1. Can you follow what we did? First we solved the
				brackets. There were no orders or division so we didn't have to worry
				about them. Then we solved the multiplication, addition and finally the
				subtraction.
			</p>
		</div>
	);
};
