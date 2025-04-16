import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	contactFormSchema,
	ContactFormData,
} from "@/app/libs/validations/contact";
import { useState } from "react";

export default function ContactForm({ className }: { className?: string }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ContactFormData>({
		resolver: zodResolver(contactFormSchema),
	});

	const [lastSubmission, setLastSubmission] = useState<number>(0);

	const onSubmit = async (data: ContactFormData) => {
		try {
			// Check if 60 seconds have passed since last submission
			const now = Date.now();
			if (now - lastSubmission < 60000) {
				throw new Error("Please wait a minute before sending another message");
			}

			const response = await fetch("/api/emails/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.message || "Failed to send email");
			}

			setLastSubmission(now);
			alert("Message sent successfully!");
			reset();
		} catch (error) {
			console.error("Error:", error);
			alert(
				error instanceof Error
					? error.message
					: "An error occurred while sending the message."
			);
		}
	};

	return (
		<div
			className={`w-full border border-gray-300 rounded-lg p-4 lg:w-[800px] bg-gray-200 shadow mx-auto ${className}`}
		>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Name <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						{...register("name")}
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-black"
					/>
					{errors.name && (
						<span className="text-red-500">{errors.name.message}</span>
					)}
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Email <span className="text-red-500">*</span>
					</label>
					<input
						type="email"
						{...register("email")}
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-black"
					/>
					{errors.email && (
						<span className="text-red-500">{errors.email.message}</span>
					)}
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Phone <span className="text-red-500">*</span>
					</label>
					<input
						type="tel"
						{...register("phone")}
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-black"
					/>
					{errors.phone && (
						<span className="text-red-500">{errors.phone.message}</span>
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
						Message<span className="text-red-500">*</span>
					</label>
					<textarea
						{...register("message")}
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-black h-32"
					></textarea>
					{errors.message && (
						<span className="text-red-500">{errors.message.message}</span>
					)}
				</div>
				<div className="flex justify-end">
					<div
						role="button"
						tabIndex={0}
						className="mt-4 text-white py-2 px-6 rounded-md cursor-pointer"
						style={{ backgroundColor: "#f2ad2e" }}
						onClick={handleSubmit(onSubmit)}
						onKeyPress={(e) => {
							if (e.key === "Enter") handleSubmit(onSubmit)();
						}}
					>
						Send
					</div>
				</div>
			</form>
		</div>
	);
}
