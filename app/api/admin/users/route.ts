import { NextResponse } from "next/server";
import {
	CognitoIdentityProviderClient,
	ListUsersCommand,
	UserType,
	AttributeType,
	AdminListGroupsForUserCommand,
	AdminCreateUserCommand,
	AdminDeleteUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const cognito = new CognitoIdentityProviderClient({
	region: "us-east-1",
});
//Production
// const USER_POOL_ID = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID_PROD;

//Testing
const USER_POOL_ID = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID_TEST;

const PROTECTED_EMAIL = "matthew@mathsadvantage.com.au";

export async function GET(request: Request) {
	try {
		// Get the authorization header
		const authHeader = request.headers.get("authorization");
		if (!authHeader?.startsWith("Bearer ")) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		// List users from Cognito
		const command = new ListUsersCommand({
			UserPoolId: USER_POOL_ID,
		});

		const response = await cognito.send(command);

		// For each user, fetch their groups
		const users = await Promise.all(
			(response.Users || []).map(async (user: UserType) => {
				let groups: string[] = [];
				if (user.Username) {
					const groupResp = await cognito.send(
						new AdminListGroupsForUserCommand({
							UserPoolId: USER_POOL_ID,
							Username: user.Username,
						})
					);
					groups = (groupResp.Groups || []).map((g) => g.GroupName || "");
				}
				return {
					username: user.Username,
					email: user.Attributes?.find(
						(attr: AttributeType) => attr.Name === "email"
					)?.Value,
					enabled: user.Enabled,
					userStatus: user.UserStatus,
					groups,
				};
			})
		);

		return NextResponse.json({ users });
	} catch (error) {
		console.error("Error fetching users:", error);
		return NextResponse.json(
			{ error: "Failed to fetch users" },
			{ status: 500 }
		);
	}
}

export async function POST(request: Request) {
	try {
		const { email, temporaryPassword } = await request.json();
		if (!email || !temporaryPassword) {
			return NextResponse.json(
				{ error: "Email and temporary password required" },
				{ status: 400 }
			);
		}
		await cognito.send(
			new AdminCreateUserCommand({
				UserPoolId: USER_POOL_ID,
				Username: email,
				TemporaryPassword: temporaryPassword,
				UserAttributes: [{ Name: "email", Value: email }],
				MessageAction: "SUPPRESS", // Don't send invite email automatically
			})
		);
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Error creating user:", error);
		return NextResponse.json(
			{ error: "Failed to create user" },
			{ status: 500 }
		);
	}
}

export async function DELETE(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const username = searchParams.get("username");
		if (!username) {
			return NextResponse.json({ error: "Username required" }, { status: 400 });
		}
		if (username === PROTECTED_EMAIL) {
			return NextResponse.json(
				{ error: "Cannot delete this user via API" },
				{ status: 403 }
			);
		}
		await cognito.send(
			new AdminDeleteUserCommand({
				UserPoolId: USER_POOL_ID,
				Username: username,
			})
		);
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Error deleting user:", error);
		return NextResponse.json(
			{ error: "Failed to delete user" },
			{ status: 500 }
		);
	}
}
