import { NextResponse } from "next/server";
import {
	CognitoIdentityProviderClient,
	ListUsersCommand,
	UserType,
	AttributeType,
	AdminListGroupsForUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const cognito = new CognitoIdentityProviderClient({
	region: "us-east-1",
});

export async function GET(request: Request) {
	try {
		// Get the authorization header
		const authHeader = request.headers.get("authorization");
		if (!authHeader?.startsWith("Bearer ")) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		// List users from Cognito
		const command = new ListUsersCommand({
			UserPoolId: "us-east-1_Jn6Ruf7G7",
		});

		const response = await cognito.send(command);

		// For each user, fetch their groups
		const users = await Promise.all(
			(response.Users || []).map(async (user: UserType) => {
				let groups: string[] = [];
				if (user.Username) {
					const groupResp = await cognito.send(
						new AdminListGroupsForUserCommand({
							UserPoolId: "us-east-1_Jn6Ruf7G7",
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
