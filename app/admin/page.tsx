"use client";
import { useAuth } from "react-oidc-context";
import { LoginButton } from "@/components/LoginButton";
import { Spinner } from "@/components/Spinner";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminPage() {
	const auth = useAuth();
	const [showSpinner, setShowSpinner] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowSpinner(true);
		}, 500);
		return () => clearTimeout(timer);
	}, []);

	const isAdmin = () => {
		const email = auth.user?.profile.email;
		const groups = auth.user?.profile["cognito:groups"] as string[] | undefined;
		return (groups?.includes("Admin") || email === "test@test.com.au") ?? false;
	};

	const containerClasses = "p-4 flex items-center justify-center";
	const cardClasses =
		"w-full max-w-[800px] border border-gray-200 rounded-lg shadow-lg p-6 bg-white";

	if (auth.error) {
		return (
			<div className={containerClasses}>
				<div className={cardClasses}>
					<div className="text-red-500 text-center">
						Error: {auth.error.message}
					</div>
				</div>
			</div>
		);
	}

	if (auth.isAuthenticated) {
		return (
			<div className={containerClasses}>
				<div className={cardClasses}>
					<h1 className="text-3xl text-teal-600 mb-6 text-center">
						Administrator Portal
					</h1>
					{isAdmin() ? (
						<div className="space-y-4">
							<p className="text-lg text-center">
								Welcome, {auth.user?.profile.name || auth.user?.profile.email}
							</p>
							<div className="grid gap-4 max-w-md mx-auto">
								<button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors">
									Manage Bookings
								</button>
								<Link
									href="/admin/users"
									className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors text-center"
								>
									Manage Users
								</Link>
							</div>
							<div className="text-center">
								<LoginButton />
							</div>
						</div>
					) : (
						<div className="text-red-500 text-center">
							You do not have permission to access this page.
						</div>
					)}
				</div>
			</div>
		);
	}

	if (auth.isLoading && showSpinner) {
		return (
			<div className={containerClasses}>
				<div className={cardClasses + " mt-12"}>
					<h1 className="text-3xl text-teal-600 mb-6 text-center">
						Administrator Portal
					</h1>
					<div className="text-center">
						<Spinner />
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className={containerClasses}>
			<div className={cardClasses + " mt-12"}>
				<h1 className="text-3xl text-teal-600 mb-6 text-center">
					Administrator Portal
				</h1>
				<div className="text-center">
					<LoginButton />
				</div>
			</div>
		</div>
	);
}
