interface RateLimitStore {
	[key: string]: {
		count: number;
		lastReset: number;
	};
}

const store: RateLimitStore = {};

export function rateLimit(
	ip: string,
	limit: number = 1,
	windowMs: number = 60000
) {
	const now = Date.now();
	const windowStart = now - windowMs;

	// Clean old entries
	if (!store[ip]) {
		store[ip] = { count: 0, lastReset: now };
	}

	// Reset if outside window
	if (store[ip].lastReset < windowStart) {
		store[ip] = { count: 0, lastReset: now };
	}

	// Check limit
	if (store[ip].count >= limit) {
		throw new Error("Rate limit exceeded. Please try again later.");
	}

	// Increment counter
	store[ip].count++;
	return true;
}
