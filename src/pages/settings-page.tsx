import React, { useState, useEffect } from "react";
import MenuBar from "../components/molecules/menu-bar";

const SettingsPage: React.FC = () => {
	const [darkMode, setDarkMode] = useState(
		document.documentElement.classList.contains("dark")
	);

	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [darkMode]);

	return (
		<div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col">
			<MenuBar
				menuItems={[
					{ key: "home", label: "Home" },
					{ key: "settings", label: "Settings" },
					{ key: "logout", label: "Logout" },
				]}
				onMenuClick={(key) => {
					if (key === "settings") return; // Already on settings
					if (key === "home") {
						window.location.href = "/dashboard";
					}
					if (key === "logout") {
						// Optional: implement logout here or redirect
						window.location.href = "/login";
					}
				}}
			/>
			<div className="flex-1 p-6">
				<h2 className="text-2xl font-bold mb-4">Settings</h2>

				<div className="flex items-center gap-4">
					<span>Dark Mode:</span>
					<button
						onClick={() => setDarkMode(!darkMode)}
						className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600"
					>
						{darkMode ? "Disable Dark Mode" : "Enable Dark Mode"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default SettingsPage;
