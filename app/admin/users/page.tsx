"use client";
import { useAuth } from "react-oidc-context";
import { useState, useEffect } from "react";
import { Spinner } from "@/components/Spinner";
import { LoginButton } from "@/components/LoginButton";
import {
	fetchUsers,
	createUser,
	editUserName,
	editUserPassword,
	deleteUser,
} from "@/lib/userApi";
import { ProtectedRoute } from "@/components/ProtectedRoute";

interface User {
	username: string;
	email: string;
	name?: string;
	enabled: boolean;
	userStatus: string;
	groups?: string[];
}

export default function UsersPage() {
	const auth = useAuth();
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [newUser, setNewUser] = useState({ email: "", password: "", name: "" });
	const [creating, setCreating] = useState(false);
	const [editingUser, setEditingUser] = useState<string | null>(null);
	const [editName, setEditName] = useState("");
	const [editingPassword, setEditingPassword] = useState<string | null>(null);
	const [newPassword, setNewPassword] = useState("");
	const PROTECTED_EMAIL = "matthew@mathsadvantage.com.au";

	const isAdmin = () => {
		const groups = auth.user?.profile["cognito:groups"] as string[] | undefined;
		return (
			(groups?.includes("Admin") || groups?.includes("test-admin")) ?? false
		);
	};
	const fetchAllUsers = async () => {
		try {
			if (!auth.user?.access_token) {
				alert(
					"Authentication error: No access token found. Please log in again."
				);
				return;
			}
			const users = await fetchUsers(auth.user.access_token);
			setUsers(users);
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		if (auth.isAuthenticated && isAdmin()) {
			fetchAllUsers();
		}
	}, [auth.isAuthenticated, auth.user?.access_token]);

	const containerClasses = "p-4 flex items-center justify-center";
	const cardClasses =
		"w-full border border-gray-200 rounded-lg shadow-lg p-6 bg-white";

	const handleCreateUser = async (e: React.FormEvent) => {
		e.preventDefault();
		setCreating(true);
		try {
			if (!auth.user?.access_token) {
				alert(
					"Authentication error: No access token found. Please log in again."
				);
				return;
			}
			await createUser(
				auth.user.access_token,
				newUser.email,
				newUser.password,
				newUser.name
			);
			setNewUser({ email: "", password: "", name: "" });
			window.location.reload();
		} catch (err: any) {
			alert(err.message);
		} finally {
			setCreating(false);
		}
	};

	const handleEditName = async (username: string) => {
		try {
			if (!auth.user?.access_token) {
				alert(
					"Authentication error: No access token found. Please log in again."
				);
				return;
			}
			await editUserName(auth.user.access_token, username, editName);
			setEditingUser(null);
			setEditName("");
			window.location.reload();
		} catch (err: any) {
			alert(err.message);
		}
	};

	const handleEditPassword = async (username: string) => {
		try {
			if (!auth.user?.access_token) {
				alert(
					"Authentication error: No access token found. Please log in again."
				);
				return;
			}
			await editUserPassword(auth.user.access_token, username, newPassword);
			setEditingPassword(null);
			setNewPassword("");
			alert("Password updated successfully");
		} catch (err: any) {
			alert(err.message);
		}
	};

	const handleDeleteUser = async (username: string) => {
		if (!window.confirm("Are you sure you want to delete this user?")) return;
		try {
			if (!auth.user?.access_token) {
				alert(
					"Authentication error: No access token found. Please log in again."
				);
				return;
			}
			await deleteUser(auth.user.access_token, username);
			window.location.reload();
		} catch (err: any) {
			alert(err.message);
		}
	};

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
		<ProtectedRoute>
			<div className={containerClasses}>
				<div className={cardClasses}>
					<h1 className="text-3xl text-teal-600 mb-6 text-center">
						User Management
					</h1>
					{/* Create User Form */}
					<form
						onSubmit={handleCreateUser}
						className="mb-6 flex flex-wrap gap-2 items-center"
					>
						<input
							type="email"
							required
							placeholder="Email"
							value={newUser.email}
							onChange={(e) =>
								setNewUser({ ...newUser, email: e.target.value })
							}
							className="p-2 border rounded"
						/>
						<input
							type="text"
							required
							placeholder="Name"
							value={newUser.name}
							onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
							className="p-2 border rounded"
						/>
						<input
							type="password"
							required
							placeholder="Temp Password"
							value={newUser.password}
							onChange={(e) =>
								setNewUser({ ...newUser, password: e.target.value })
							}
							className="p-2 border rounded"
						/>
						<button
							type="submit"
							disabled={creating}
							className="bg-teal-600 text-white px-4 py-2 rounded cursor-pointer"
						>
							Create User
						</button>
					</form>
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
											Name
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Status
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Groups
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Actions
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{users.map((user) => {
										const isProtectedAdmin =
											user.groups?.includes("Admin") ||
											user.groups?.includes("test-admin");
										return (
											<tr key={user.username}>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
													{user.username}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
													{user.email}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
													{editingUser === user.username ? (
														<>
															<input
																type="text"
																value={editName}
																onChange={(e) => setEditName(e.target.value)}
																className="p-1 border rounded"
																disabled={isProtectedAdmin}
															/>
															{!isProtectedAdmin ? (
																<>
																	<button
																		onClick={() =>
																			handleEditName(user.username)
																		}
																		className="ml-2 text-blue-600 cursor-pointer"
																	>
																		Save
																	</button>
																	<button
																		onClick={() => setEditingUser(null)}
																		className="ml-2 text-gray-600 cursor-pointer"
																	>
																		Cancel
																	</button>
																</>
															) : (
																<span className="ml-2 text-gray-400 cursor-not-allowed">
																	Edit (disabled)
																</span>
															)}
														</>
													) : (
														<>
															{user.name || "-"}{" "}
															{!isProtectedAdmin ? (
																<button
																	onClick={() => {
																		setEditingUser(user.username);
																		setEditName(user.name || "");
																	}}
																	className="ml-2 text-blue-600 cursor-pointer"
																>
																	Edit
																</button>
															) : (
																<span className="ml-2 text-gray-400 cursor-not-allowed">
																	Edit
																</span>
															)}
														</>
													)}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
													{user.enabled ? "Enabled" : "Disabled"}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
													{user.groups?.join(", ") || "No groups"}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
													{editingPassword === user.username ? (
														<>
															<input
																type="password"
																value={newPassword}
																onChange={(e) => setNewPassword(e.target.value)}
																placeholder="New Password"
																className="p-1 border rounded"
																disabled={isProtectedAdmin}
															/>
															{!isProtectedAdmin ? (
																<>
																	<button
																		onClick={() =>
																			handleEditPassword(user.username)
																		}
																		className="ml-2 text-blue-600 cursor-pointer"
																	>
																		Save
																	</button>
																	<button
																		onClick={() => {
																			setEditingPassword(null);
																			setNewPassword("");
																		}}
																		className="ml-2 text-gray-600 cursor-pointer"
																	>
																		Cancel
																	</button>
																</>
															) : (
																<span className="ml-2 text-gray-400 cursor-not-allowed">
																	Change Password (disabled)
																</span>
															)}
														</>
													) : (
														<>
															{!isProtectedAdmin ? (
																<>
																	<button
																		onClick={() =>
																			setEditingPassword(user.username)
																		}
																		className="text-blue-600 mr-2 cursor-pointer"
																	>
																		Change Password
																	</button>
																	<button
																		onClick={() =>
																			handleDeleteUser(user.username)
																		}
																		className="text-red-600 cursor-pointer"
																		disabled={user.email === PROTECTED_EMAIL}
																	>
																		Delete
																	</button>
																</>
															) : (
																<>
																	<span className="text-gray-400 cursor-not-allowed mr-2">
																		Change Password
																	</span>
																	<span className="text-gray-400 cursor-not-allowed">
																		Delete
																	</span>
																</>
															)}
														</>
													)}
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					)}
					<div className="mt-6 text-center">
						<LoginButton />
					</div>
				</div>
			</div>
		</ProtectedRoute>
	);
}
