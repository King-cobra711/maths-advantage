import { EmailError } from "../../utils/error-handler";

import { NextResponse } from "next/server";
import { handleEmailError } from "../../utils/error-handler";

export async function POST(request: Request) {
	try {
		const { name, email } = await request.json();

		if (!email) {
			throw new EmailError("Email is required", 400);
		}

		// ... email sending logic ...

		return NextResponse.json({ success: true });
	} catch (error) {
		return handleEmailError(error);
	}
}
