"use client";
import { AuthProvider } from "react-oidc-context";

const isDevelopment = process.env.NODE_ENV === "development";
const baseUrl = isDevelopment
	? "http://localhost:3000"
	: "https://dev.mathsadvantage.com.au";

// This is pool for production
// const cognitoAuthConfig = {
// 	authority: process.env.NEXT_PUBLIC_COGNITO_AUTHORITY_PROD,
// 	client_id: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID_PROD,
// 	redirect_uri: `${baseUrl}/admin`,
// 	post_logout_redirect_uri: `${baseUrl}/admin`,
// 	response_type: "code",
// 	scope: "email openid phone",
// };

// This is pool for testing
const cognitoAuthConfig = {
	authority: process.env.NEXT_PUBLIC_COGNITO_AUTHORITY_TEST,
	client_id: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID_TEST,
	redirect_uri: `${baseUrl}/admin`,
	post_logout_redirect_uri: `${baseUrl}/admin`,
	response_type: "code",
	scope: "email openid phone",
};

export function Providers({ children }: { children: React.ReactNode }) {
	return <AuthProvider {...cognitoAuthConfig}>{children}</AuthProvider>;
}
