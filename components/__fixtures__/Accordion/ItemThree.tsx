import Image from "next/image";

export const AccordionItemThree = () => {
	return (
		<div className="p-4">
			<h2 className="text-2xl mb-4">BODMAS - the finer detail</h2>
			<div className="flex justify-center my-10">
				<Image
					src="/images/BODMAS 1.jpg"
					alt="BODMAS 1"
					width={400}
					height={400}
					className="rounded-md py-6"
				/>
			</div>
			<p className="mb-4">
				This problem has been appearing on Facebook recently and creating more
				than a little confusion. While most people agree that whatever is
				contained in brackets should be calculated first, the big question being
				asked is whether the multiplication or the division should be calculated
				next.
			</p>
			<p className="mb-4">
				Does it matter? Put simply YES! and this question is an example of why.
			</p>
			<h3 className="mt-4 mb-2 font-bold">BODMAS</h3>
			<p className="mb-4">
				All questions like this rely on the mathematical order of operations.In
				summary, the mathematical order for calculating equations is BODMAS
				(also called BOMDAS, BIMDAS, PEDMAS - depending on how you were taught).
			</p>
			<div className="flex justify-center my-10">
				<Image
					src="/images/Operations BODMAS.png"
					alt="Order of Operations Example"
					width={400}
					height={400}
					className="rounded-md py-6"
				/>
			</div>
			<p className="mt-4">
				For this particular question however, we need to look at the finer
				detail of BODMAS.
			</p>
			<h3 className="mt-4 mb-2 font-bold">Now for the finer detail</h3>
			<p className="mt-4">
				When we are expected to do both division and multiplication in the one
				equation, which one do first? The answer is that we work them from left
				to right. Whichever one comes first is the one we do first.
			</p>
			<p className="text-center font-bold text-red-500">
				Division or Multiplication = Left to Right
			</p>
			<p className="my-4">
				The same principle applies to addition and subtraction. Always left to
				right.
			</p>
			<p className="text-center font-bold text-red-500">
				Addition or Subtraction = Left to Right
			</p>
			<div className="flex justify-center my-10">
				<Image
					src="/images/BODMAS 2.jpg"
					alt="Order of Operations Example"
					width={400}
					height={400}
					className="rounded-md py-6"
				/>
			</div>
			<p className="mt-4">
				Did you follow what we did? Brackets first. After that we had both
				division and multiplication to calculate. We know that we do these from
				left to right so - division first, then multiplication.
			</p>
		</div>
	);
};
