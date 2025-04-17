import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from "./providers/auth-provider";

const openSans = Open_Sans({
	weight: ["400", "700"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Maths Advantage",
	description: "Maths Advantage",
	icons: {
		icon: "/favicon.jpg",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="flex flex-col min-h-screen">
				<Providers>
					<Header />
					<main className="flex-grow max-w-7xl px-3 lg:mx-auto">
						{children}
					</main>
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
