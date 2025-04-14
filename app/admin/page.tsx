"use client";
import { useAuth } from "react-oidc-context";
import { LoginButton } from "@/components/LoginButton";

export default function AdminPage() {
	const auth = useAuth();

	const isAdmin = () => {
		const groups = auth.user?.profile["cognito:groups"] as string[] | undefined;
		return groups?.includes("Admin") ?? false;
	};

	if (auth.isLoading) {
		return (
			<div className="flex justify-center items-center min-h-[50vh]">
				<div className="text-xl">Loading...</div>
			</div>
		);
	}

	if (auth.error) {
		return (
			<div className="flex justify-center items-center min-h-[50vh]">
				<div className="text-red-500">Error: {auth.error.message}</div>
			</div>
		);
	}

	if (auth.isAuthenticated) {
		return (
			<div className="max-w-[800px] mx-auto py-8">
				<h1 className="text-3xl text-teal-600 mb-6">Admin Dashboard</h1>
				{isAdmin() ? (
					<div className="space-y-4">
						<p className="text-lg">Welcome, {auth.user?.profile.email}</p>
						<div className="grid gap-4">
							<button className="bg-teal-600 text-white px-4 py-2 rounded">
								Manage Bookings
							</button>
							<button className="bg-teal-600 text-white px-4 py-2 rounded">
								Manage Users
							</button>
						</div>
						<LoginButton />
					</div>
				) : (
					<div className="text-red-500">
						You do not have permission to access this page.
					</div>
				)}
			</div>
		);
	}

	return (
		<div className="max-w-[800px] py-8">
			<h1 className="text-3xl text-teal-600 mb-6">Admin Login</h1>
			<LoginButton />
		</div>
	);
}
