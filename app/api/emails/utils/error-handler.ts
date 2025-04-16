import { NextResponse } from "next/server";

export class EmailError extends Error {
	constructor(
		message: string,
		public statusCode: number = 500,
		public context?: any
	) {
		super(message);
		this.name = "EmailError";
	}
}

export function handleEmailError(error: unknown) {
	console.error("Email error:", error);

	if (error instanceof EmailError) {
		return NextResponse.json(
			{ error: error.message, context: error.context },
			{ status: error.statusCode }
		);
	}

	// AWS SES specific errors
	if (error instanceof Error && "Code" in error) {
		switch (error.name) {
			case "MessageRejected":
				return NextResponse.json(
					{ error: "Email rejected by server" },
					{ status: 422 }
				);
			case "ThrottlingException":
				return NextResponse.json(
					{ error: "Too many requests" },
					{ status: 429 }
				);
			default:
				return NextResponse.json(
					{ error: "Failed to send email" },
					{ status: 500 }
				);
		}
	}

	// Generic error
	return NextResponse.json(
		{ error: "An unexpected error occurred" },
		{ status: 500 }
	);
}
