interface User {
	username: string;
	email: string;
	name?: string;
	enabled: boolean;
	userStatus: string;
	groups?: string[];
}

interface AdminActionsModalProps {
	user: User;
	onClose: () => void;
	onEditName: (username: string) => Promise<void>;
	onEditPassword: (username: string) => Promise<void>;
	onDelete: (username: string) => Promise<void>;
	editingUser: string | null;
	setEditingUser: (username: string | null) => void;
	editName: string;
	setEditName: (name: string) => void;
	editingPassword: string | null;
	setEditingPassword: (username: string | null) => void;
	newPassword: string;
	setNewPassword: (pw: string) => void;
	creating: boolean;
}

export function AdminActionsModal({
	user,
	onClose,
	onEditName,
	onEditPassword,
	onDelete,
	editingUser,
	setEditingUser,
	editName,
	setEditName,
	editingPassword,
	setEditingPassword,
	newPassword,
	setNewPassword,
	creating,
}: AdminActionsModalProps) {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
			<div className="bg-white rounded-lg shadow-lg p-6 min-w-[320px] relative">
				<button
					onClick={onClose}
					className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-3xl"
					aria-label="Close"
				>
					&times;
				</button>
				<h2 className="text-xl font-semibold mb-4 text-center">Edit User</h2>
				<div className="mb-4">
					<div className="mb-2">
						<span className="font-medium">Email:</span> {user.email}
					</div>
					<div className="mb-2">
						<span className="font-medium">Name:</span> {user.name || "-"}
					</div>
					<div className="mb-2">
						<span className="font-medium">Groups:</span>{" "}
						{user.groups?.join(", ") || "No groups"}
					</div>
				</div>
				{/* Edit Name */}
				{editingUser === user.username ? (
					<div className="mb-4">
						<input
							type="text"
							value={editName}
							onChange={(e) => setEditName(e.target.value)}
							className="p-2 border rounded w-full"
							placeholder="New name"
						/>
						<div className="flex gap-2 mt-2">
							<button
								onClick={() => onEditName(user.username)}
								className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-500 hover:cursor-pointer"
								disabled={creating}
							>
								Save
							</button>
							<button
								onClick={() => setEditingUser(null)}
								className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 hover:cursor-pointer"
							>
								Cancel
							</button>
						</div>
					</div>
				) : (
					<button
						onClick={() => {
							setEditingUser(user.username);
							setEditName(user.name || "");
						}}
						className="w-full mb-2 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-500 hover:cursor-pointer"
					>
						Edit Name
					</button>
				)}
				{/* Change Password */}
				{editingPassword === user.username ? (
					<div className="mb-4">
						<input
							type="password"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							className="p-2 border rounded w-full"
							placeholder="New password"
						/>
						<div className="flex gap-2 mt-2">
							<button
								onClick={() => onEditPassword(user.username)}
								className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-500 hover:cursor-pointer"
								disabled={creating}
							>
								Save
							</button>
							<button
								onClick={() => setEditingPassword(null)}
								className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 hover:cursor-pointer"
							>
								Cancel
							</button>
						</div>
					</div>
				) : (
					<button
						onClick={() => {
							setEditingPassword(user.username);
							setNewPassword("");
						}}
						className="w-full mb-2 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-500 hover:cursor-pointer"
					>
						Change Password
					</button>
				)}
				{/* Delete User */}
				<button
					onClick={() => onDelete(user.username)}
					className="w-full bg-red-100 text-red-700 px-4 py-2 rounded hover:bg-red-200 mt-2 hover:cursor-pointer"
					disabled={creating}
				>
					Delete User
				</button>
			</div>
		</div>
	);
}
