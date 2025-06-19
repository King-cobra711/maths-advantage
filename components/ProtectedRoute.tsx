"use client";
import { useAuth } from "react-oidc-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spinner } from "@/components/Spinner";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const auth = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!auth.isLoading && !auth.isAuthenticated) {
			router.replace("/");
		}
	}, [auth.isLoading, auth.isAuthenticated, router]);

	if (auth.isLoading) {
		return <Spinner />;
	}

	if (!auth.isAuthenticated) {
		return null;
	}

	return <>{children}</>;
}
