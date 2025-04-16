import { handleEmailError, EmailError } from "../utils/error-handler";
import { SendEmailCommand } from "@aws-sdk/client-ses";
import { ses } from "../utils/ses-client";
import { NextResponse } from "next/server";
import { rateLimit } from "../utils/rate-limit";
import { headers } from "next/headers";

export async function POST(request: Request) {
	try {
		// Get IP and apply rate limiting
		const headersList = await headers();
		const ip = headersList.get("x-forwarded-for") || "unknown";
		rateLimit(ip);

		// Get and validate request data
		const { name, email, phone, subject, message } = await request.json();

		if (!email) {
			throw new EmailError("Email is required", 400);
		}

		// Create email command
		const command = new SendEmailCommand({
			Source: process.env.SES_VERIFIED_EMAIL!,
			Destination: {
				ToAddresses: [process.env.CONTACT_EMAIL!],
			},
			Message: {
				Subject: {
					Data: `Maths Advantage Inquiry: ${
						subject || "Maths Advantage Contact Form"
					}`,
				},
				Body: {
					Text: {
						Data: `
							Name: ${name}
							Email: ${email}
							Phone: ${phone}
							Message: ${message}
						`,
					},
				},
			},
		});

		// Send email
		await ses.send(command);
		return NextResponse.json({ success: true });
	} catch (error) {
		return handleEmailError(error);
	}
}
