import { NextResponse } from "next/server";
import {
	CognitoIdentityProviderClient,
	ListUsersCommand,
	UserType,
	AttributeType,
	AdminListGroupsForUserCommand,
	AdminCreateUserCommand,
	AdminDeleteUserCommand,
	AdminUpdateUserAttributesCommand,
	AdminAddUserToGroupCommand,
	AdminSetUserPasswordCommand,
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
		const authHeader = request.headers.get("authorization");
		if (!authHeader?.startsWith("Bearer ")) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const command = new ListUsersCommand({
			UserPoolId: USER_POOL_ID,
		});

		const response = await cognito.send(command);

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
					name: user.Attributes?.find(
						(attr: AttributeType) => attr.Name === "name"
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
		const { email, temporaryPassword, name } = await request.json();
		if (!email || !temporaryPassword) {
			return NextResponse.json(
				{ error: "Email and temporary password required" },
				{ status: 400 }
			);
		}

		// Create the user
		await cognito.send(
			new AdminCreateUserCommand({
				UserPoolId: USER_POOL_ID,
				Username: email,
				TemporaryPassword: temporaryPassword,
				UserAttributes: [
					{ Name: "email", Value: email },
					...(name ? [{ Name: "name", Value: name }] : []),
				],
				MessageAction: "SUPPRESS",
			})
		);

		await cognito.send(
			new AdminAddUserToGroupCommand({
				UserPoolId: USER_POOL_ID,
				Username: email,
				GroupName: "student",
			})
		);

		return NextResponse.json({ success: true });
	} catch (error: any) {
		console.error("Error creating user:", error);
		const message =
			error?.message || error?.toString() || "Failed to create user";
		return NextResponse.json({ error: message }, { status: 400 });
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
	} catch (error: any) {
		console.error("Error deleting user:", error);
		const message =
			error?.message || error?.toString() || "Failed to delete user";
		return NextResponse.json({ error: message }, { status: 400 });
	}
}

export async function PATCH(request: Request) {
	try {
		const { username, name, password } = await request.json();

		// Handle password update
		if (password) {
			if (!username) {
				return NextResponse.json(
					{ error: "Username required for password update" },
					{ status: 400 }
				);
			}
			await cognito.send(
				new AdminSetUserPasswordCommand({
					UserPoolId: USER_POOL_ID,
					Username: username,
					Password: password,
					Permanent: true,
				})
			);
			return NextResponse.json({ success: true });
		}

		// Handle name update
		if (name) {
			if (!username || !name) {
				return NextResponse.json(
					{ error: "Username and name required" },
					{ status: 400 }
				);
			}
			await cognito.send(
				new AdminUpdateUserAttributesCommand({
					UserPoolId: USER_POOL_ID,
					Username: username,
					UserAttributes: [{ Name: "name", Value: name }],
				})
			);
			return NextResponse.json({ success: true });
		}

		return NextResponse.json(
			{ error: "Either name or password must be provided" },
			{ status: 400 }
		);
	} catch (error: any) {
		console.error("Error updating user:", error);
		const message =
			error?.message || error?.toString() || "Failed to update user";
		return NextResponse.json({ error: message }, { status: 400 });
	}
}
