// Fetch all users (admin)
export async function fetchUsers(token: string) {
	const response = await fetch("/api/admin/users", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	if (!response.ok) {
		const data = await response.json();
		throw new Error(data.error || "Failed to fetch users");
	}
	const data = await response.json();
	return data.users;
}

// Create a new user (admin)
export async function createUser(
	token: string,
	email: string,
	password: string,
	name: string
) {
	const res = await fetch("/api/admin/users", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			email,
			temporaryPassword: password,
			name,
		}),
	});
	const data = await res.json();
	if (!res.ok) throw new Error(data.error || "Failed to create user");
	return data;
}

// Edit a user's name (admin)
export async function editUserName(
	token: string,
	username: string,
	name: string
) {
	const res = await fetch("/api/admin/users", {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ username, name }),
	});
	const data = await res.json();
	if (!res.ok) throw new Error(data.error || "Failed to update name");
	return data;
}

// Edit a user's password (admin)
export async function editUserPassword(
	token: string,
	username: string,
	password: string
) {
	const res = await fetch("/api/admin/users", {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ username, password }),
	});
	const data = await res.json();
	if (!res.ok) throw new Error(data.error || "Failed to update password");
	return data;
}

// Delete a user (admin)
export async function deleteUser(token: string, username: string) {
	const res = await fetch(
		`/api/admin/users?username=${encodeURIComponent(username)}`,
		{
			method: "DELETE",
			headers: { Authorization: `Bearer ${token}` },
		}
	);
	const data = await res.json();
	if (!res.ok) throw new Error(data.error || "Failed to delete user");
	return data;
}
