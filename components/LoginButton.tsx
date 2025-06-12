"use client";
import { useAuth } from "react-oidc-context";
import { Spinner } from "@/components/Spinner";
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

	if (auth.isLoading) {
		return <Spinner />;
	}

	if (auth.error) {
		return <div>Oops... {auth.error.message}</div>;
	}

	if (auth.isAuthenticated) {
		return (
			<div className="flex flex-col items-center gap-4">
				<button
					onClick={handleLogout}
					className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
				>
					Log out
				</button>
			</div>
		);
	}

	return (
		<button
			onClick={() => void auth.signinRedirect()}
			className="bg-teal-600 text-white px-4 py-2 rounded cursor-pointer"
		>
			Login
		</button>
	);
}
