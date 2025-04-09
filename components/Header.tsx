import DesktopNavbar from "@/components/DesktopNavbar";
import MobileNavbar from "@/components/MobileNavbar";

export default function Header() {
	return (
		<header className="bg-white">
			<DesktopNavbar className="hidden lg:flex" />
			<MobileNavbar className="lg:hidden" />
		</header>
	);
}
