import React, { useState } from "react";
import Logo from "../atoms/logo";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

interface MenuItem {
	key: string;
	label: string;
}

interface MenuBarProps {
	menuItems?: MenuItem[];
	onMenuClick?: (key: string) => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ menuItems = [], onMenuClick }) => {
	const [menuOpen, setMenuOpen] = useState(false);

	const handleMenuClick = (key: string) => {
		onMenuClick?.(key);
		setMenuOpen(false); // Close menu on item click
	};

	return (
		<div className="sticky top-0 w-full bg-gradient-to-r from-gray-200 to-gray-400 dark:from-gray-800 dark:to-gray-950 text-gray-900 dark:text-white flex items-center justify-between px-4 py-3 shadow z-50">
			{/* Left side: Logo + Title */}
			<div className="flex items-center gap-2">
				<Logo variant="sm" />
				<span className="text-lg font-semibold hidden sm:inline">
					Central Admin
				</span>
			</div>

			{/* Desktop menu */}
			<div className="hidden sm:flex gap-4">
				{menuItems.map((item) => (
					<button
						key={item.key}
						className="hover:underline text-gray-900 dark:text-white"
						onClick={() => handleMenuClick(item.key)}
					>
						{item.label}
					</button>
				))}
			</div>

			{/* Mobile hamburger button */}
			<div className="sm:hidden">
				<button onClick={() => setMenuOpen(!menuOpen)}>
					{menuOpen ? (
						<XMarkIcon className="h-6 w-6 text-gray-900 dark:text-white" />
					) : (
						<Bars3Icon className="h-6 w-6 text-gray-900 dark:text-white" />
					)}
				</button>
			</div>

			{/* Mobile menu dropdown */}
			{menuOpen && (
				<div className="absolute top-14 right-4 bg-gray-300 dark:bg-gray-800 rounded-md shadow-md flex flex-col gap-2 p-4 sm:hidden z-50">
					{menuItems.map((item) => (
						<button
							key={item.key}
							className="hover:underline text-gray-900 dark:text-white text-left"
							onClick={() => handleMenuClick(item.key)}
						>
							{item.label}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default MenuBar;
