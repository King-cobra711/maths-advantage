"use client";
import { useAuth } from "react-oidc-context";

export function LoginButton() {
	const auth = useAuth();

	const handleLogout = async () => {
		try {
			await auth.removeUser();
			window.location.href = "/admin";
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	const isAdmin = () => {
		const groups = auth.user?.profile["cognito:groups"] as string[] | undefined;
		return groups?.includes("Admin") ?? false;
	};

	if (auth.isLoading) {
		return <div>Loading...</div>;
	}

	if (auth.error) {
		return <div>Oops... {auth.error.message}</div>;
	}

	if (auth.isAuthenticated) {
		return (
			<div className="flex flex-col items-center gap-4">
				<button
					onClick={handleLogout}
					className="bg-red-500 text-white px-4 py-2 rounded"
				>
					Log out
				</button>
			</div>
		);
	}

	return (
		<button
			onClick={() => void auth.signinRedirect()}
			className="bg-teal-600 text-white px-4 py-2 rounded"
		>
			Admin Login
		</button>
	);
}
