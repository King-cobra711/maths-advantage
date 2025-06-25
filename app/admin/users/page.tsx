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
import { PencilSquare } from "@/components/icons/PencilSquare";
import { AdminActionsModal } from "@/components/AdminActionsModal";

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
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [showModal, setShowModal] = useState(false);

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
											Email
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Name
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Status
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Role
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
													{user.email}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
													{user.name || "-"}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
													{user.enabled ? "Enabled" : "Disabled"}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
													{user.groups?.join(", ") || "No groups"}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
													<button
														onClick={() => {
															setSelectedUser(user);
															setShowModal(true);
														}}
														className="text-blue-600 hover:text-blue-800"
														aria-label="Edit user"
														disabled={isProtectedAdmin}
													>
														<PencilSquare
															size={20}
															color={isProtectedAdmin ? "#cbd5e1" : "#0f766e"}
														/>
													</button>
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
			{showModal && selectedUser && (
				<AdminActionsModal
					user={selectedUser}
					onClose={() => {
						setShowModal(false);
						setSelectedUser(null);
					}}
					onEditName={handleEditName}
					onEditPassword={handleEditPassword}
					onDelete={handleDeleteUser}
					editingUser={editingUser}
					setEditingUser={setEditingUser}
					editName={editName}
					setEditName={setEditName}
					editingPassword={editingPassword}
					setEditingPassword={setEditingPassword}
					newPassword={newPassword}
					setNewPassword={setNewPassword}
					creating={creating}
				/>
			)}
		</ProtectedRoute>
	);
}
