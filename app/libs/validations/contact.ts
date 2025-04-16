import { z } from "zod";

export const contactFormSchema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.string().email("Invalid email address"),
	phone: z
		.string()
		.min(1, "Phone number is required")
		.regex(/^\+?[0-9\s-()]{8,20}$/, "Please enter a valid phone number"),
	subject: z.string().optional(),
	message: z.string().min(1, "Message is required"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
