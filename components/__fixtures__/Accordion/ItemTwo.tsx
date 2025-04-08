import Image from "next/image";

export const AccordionItemTwo = () => {
	return (
		<div className="p-4">
			<h2 className="text-2xl mb-4">
				Is the Calculator '%' Button Really Magic?
			</h2>
			<div className="flex justify-center my-10">
				<Image
					src="/images/Percentage Man.avif"
					alt="Order of Operations Most people get this wrong"
					width={400}
					height={400}
					className="rounded-md py-6"
				/>
			</div>
			<p className="mb-4">
				Throughout our day we are regularly in situations where we must
				calculate a percentage of something and I worry when I watch someone
				struggle with this task simply because they can't find the percent key
				on their calculator. Have we become so reliant on our technology that we
				cannot remember the basic mathematical operations we were taught in
				school?
			</p>
			<p className="mb-4">
				As thousands of school students sit in class learning how to recognise
				and calculate percentages, I wonder how many of them really understand
				that the calculator percent button does no more than...
			</p>
			<p className="mb-4 text-center font-bold text-red-500">divide by 100!</p>
			<p className="mb-4">
				Recently I was tutoring a 15 year old student who began desperately
				searching for the percent key on his new scientific calculator. To his
				horror, the calculator did not provide this function, and so began a
				half hour lesson on dealing with calculating percentages{" "}
				<span className="font-bold">without the percent key</span>.
			</p>
			<h3 className="mt-4 mb-2 font-bold">Let's look at an example:</h3>
			<p className="mt-4">
				Suppose I was being offered a 22% discount on a television selling for
				$800. What is the amount of my discount, and how much would I actually
				be paying?
			</p>
			<p>
				To answer this question we must first find the amount of the discount
				which is 22% of $800.
			</p>
			<div className="flex flex-col items-center space-y-4">
				<Image
					src="/images/Percent Example 1.avif"
					alt="Percentage Example"
					width={400}
					height={400}
					className="rounded-md py-6"
				/>
				<p>
					The word <span className="font-bold">of</span> in mathematics means
					<span className="font-bold">multiply</span>. Replace{" "}
					<span className="font-bold">of</span> with
					<span className="font-bold">multiply</span>.
				</p>
				<Image
					src="/images/Percent Example 2.avif"
					alt="Percentage Example"
					width={400}
					height={400}
					className="rounded-md py-6"
				/>
				<p>
					The <span className="font-bold">%</span> sign means{" "}
					<span className="font-bold">divide by 100</span>. Replace{" "}
					<span className="font-bold">%</span> with{" "}
					<span className="font-bold">divide by 100</span>.
				</p>
				<Image
					src="/images/Percent Example 3.avif"
					alt="Percentage Example"
					width={400}
					height={400}
					className="rounded-md"
				/>
				<p>Now calculate the answer from left to right.</p>
				<Image
					src="/images/Percent Example 4.avif"
					alt="Percentage Example"
					width={400}
					height={400}
					className="rounded-md"
				/>
				<p>
					So we will be given a discount of $176 on our television set. Let's
					calculate our final price.
				</p>
				<p>Take our $176 discount from the $800 price.</p>
				<Image
					src="/images/Percent Example 5.avif"
					alt="Percentage Example"
					width={400}
					height={400}
				/>
				<p>
					We are only going to pay $624 for the television that normally sells
					for $800.
				</p>
				<p className="font-bold text-red-500">
					Remember '%'' means divide by 100.
				</p>
			</div>
		</div>
	);
};
