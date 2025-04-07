import DesktopNavbar from "@/components/molecules/DesktopNavbar";
import MobileNavbar from "@/components/molecules/MobileNavbar";

export default function Header() {
	return (
		<header className="bg-white">
			<DesktopNavbar className="hidden lg:flex" />
			<MobileNavbar className="lg:hidden" />
		</header>
	);
}
