"use client";
import { useAuth } from "react-oidc-context";
import { useState, useEffect } from "react";
import { Spinner } from "@/components/Spinner";
import { LoginButton } from "@/components/LoginButton";

interface User {
	username: string;
	email: string;
	enabled: boolean;
	userStatus: string;
	groups?: string[];
}

export default function UsersPage() {
	const auth = useAuth();
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const isAdmin = () => {
		const email = auth.user?.profile.email;
		const groups = auth.user?.profile["cognito:groups"] as string[] | undefined;
		return (groups?.includes("Admin") || email === "test@test.com.au") ?? false;
	};

	useEffect(() => {
		const fetchUsers = async () => {
			if (!isAdmin()) return;

			try {
				const response = await fetch("/api/admin/users", {
					headers: {
						Authorization: `Bearer ${auth.user?.access_token}`,
					},
				});

				if (!response.ok) {
					throw new Error("Failed to fetch users");
				}

				const data = await response.json();
				setUsers(data.users);
			} catch (err) {
				setError(err instanceof Error ? err.message : "An error occurred");
			} finally {
				setLoading(false);
			}
		};

		if (auth.isAuthenticated) {
			fetchUsers();
		}
	}, [auth.isAuthenticated, auth.user?.access_token]);

	const containerClasses = "p-4 flex items-center justify-center";
	const cardClasses =
		"w-full border border-gray-200 rounded-lg shadow-lg p-6 bg-white";

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

	if (!auth.isAuthenticated) {
		return (
			<div className={containerClasses}>
				<div className={cardClasses}>
					<h1 className="text-3xl text-teal-600 mb-6 text-center">
						User Management
					</h1>
					<div className="text-center">
						<LoginButton />
					</div>
				</div>
			</div>
		);
	}

	if (!isAdmin()) {
		return (
			<div className={containerClasses}>
				<div className={cardClasses}>
					<div className="text-red-500 text-center">
						You do not have permission to access this page.
					</div>
				</div>
			</div>
		);
	}

	if (loading) {
		return (
			<div className={containerClasses}>
				<div className={cardClasses}>
					<h1 className="text-3xl text-teal-600 mb-6 text-center">
						User Management
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
			<div className={cardClasses}>
				<h1 className="text-3xl text-teal-600 mb-6 text-center">
					User Management
				</h1>
				{error ? (
					<div className="text-red-500 text-center mb-4">{error}</div>
				) : (
					<div className="overflow-x-auto">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Username
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Email
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Status
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Groups
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{users.map((user) => (
									<tr key={user.username}>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											{user.username}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											{user.email}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											{user.enabled ? "Enabled" : "Disabled"}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											{user.groups?.join(", ") || "No groups"}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
				<div className="mt-6 text-center">
					<LoginButton />
				</div>
			</div>
		</div>
	);
}
