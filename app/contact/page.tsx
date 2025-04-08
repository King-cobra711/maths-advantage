export default function Contact() {
	return (
		<div className="max-w-full mx-auto p-4">
			<h1 className="text-4xl py-6 text-teal-600">CONTACT</h1>
			<div className="border border-gray-300 rounded-lg p-4 min-w-full lg:min-w-[800px] bg-grey-200 shadow">
				<form className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-lg text-gray-700">
							Name *
						</label>
						<input
							type="text"
							required
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-teal-600 text-white"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Email *
						</label>
						<input
							type="email"
							required
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-teal-600 text-white"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Phone *
						</label>
						<input
							type="tel"
							required
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-teal-600 text-white"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Subject
						</label>
						<input
							type="text"
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-teal-600 text-white"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Message
						</label>
						<textarea
							required
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-teal-600 text-white h-28"
						></textarea>
					</div>
					<div className="flex justify-end">
						<button
							type="submit"
							className="mt-4 text-white py-2 px-4 rounded-md"
							style={{ backgroundColor: "#f2ad2e" }}
						>
							Send
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
