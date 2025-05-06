import React from "react";
import MenuBar from "../components/molecules/menu-bar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/auth-context";

const DashboardPage: React.FC = () => {
	const [pageTitle, setPageTitle] = React.useState("Dashboard");
	const { signOut } = useAuth();
	const navigate = useNavigate();

	const handleMenuClick = (key: string) => {
		if (key === "logout") {
			signOut();
			navigate("/login");
		} else if (key === "settings") {
			navigate("/settings");
		} else {
			setPageTitle(key);
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col">
			<MenuBar
				menuItems={[
					{ key: "home", label: "Home" },
					{ key: "settings", label: "Settings" },
					{ key: "logout", label: "Logout" },
				]}
				onMenuClick={handleMenuClick}
			/>
			<div className="flex-1 p-6">
				<h2 className="text-2xl font-bold">
					Welcome to the {pageTitle}
				</h2>
				<p className="mt-2 text-gray-700">
					Here’s where your secured calls management will go.
				</p>
			</div>
		</div>
	);
};

export default DashboardPage;
