import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
	name: string;
	email: string;
	phone: string;
	subject?: string;
	message?: string;
}

export default function Contact() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		try {
			const response = await fetch("http://localhost:3001/send-email", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (response.ok) {
				alert("Email sent successfully!");
			} else {
				alert("Failed to send email.");
			}
		} catch (error) {
			console.error("Error:", error);
			alert("An error occurred while sending the email.");
		}
	};

	return (
		<div className="w-full border border-gray-300 rounded-lg p-4 lg:w-[800px] bg-gray-200 shadow mx-auto">
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Name <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						{...register("name", { required: true })}
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-black"
					/>
					{errors.name && (
						<span className="text-red-500">This field is required</span>
					)}
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Email <span className="text-red-500">*</span>
					</label>
					<input
						type="email"
						{...register("email", { required: true })}
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-black"
					/>
					{errors.email && (
						<span className="text-red-500">This field is required</span>
					)}
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Phone <span className="text-red-500">*</span>
					</label>
					<input
						type="tel"
						{...register("phone", { required: true })}
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-black"
					/>
					{errors.phone && (
						<span className="text-red-500">This field is required</span>
					)}
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Subject
					</label>
					<input
						type="text"
						{...register("subject")}
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-black"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Message
					</label>
					<textarea
						{...register("message", { required: true })}
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-black h-32"
					></textarea>
					{errors.message && (
						<span className="text-red-500">This field is required</span>
					)}
				</div>
				<div className="flex justify-end">
					<button
						type="submit"
						className="mt-4 text-white py-2 px-6 rounded-md"
						style={{ backgroundColor: "#f2ad2e" }}
					>
						Send
					</button>
				</div>
			</form>
		</div>
	);
}
