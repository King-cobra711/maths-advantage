"use client";
import { AuthProvider } from "react-oidc-context";

const isDevelopment = process.env.NODE_ENV === "development";
const baseUrl = isDevelopment ? "http://localhost:3000" : "http://13.55.185.86";

const cognitoAuthConfig = {
	authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_Jn6Ruf7G7",
	client_id: "3ogfcls91pc1npf6rgipmk2f7b",
	redirect_uri: `${baseUrl}/admin`,
	post_logout_redirect_uri: `${baseUrl}/admin`,
	response_type: "code",
	scope: "email openid phone",
};

export function Providers({ children }: { children: React.ReactNode }) {
	return <AuthProvider {...cognitoAuthConfig}>{children}</AuthProvider>;
}
