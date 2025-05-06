import React, { JSX } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { useAuth, AuthProvider } from "./auth/auth-context";
import DashboardPage from "./pages/dashboard-page";
import LoginPage from "./pages/login-page";
import SettingsPage from "./pages/settings-page";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
	const { user, userName, loading } = useAuth();

	if (loading) {
		// While session check is still loading, don't render or redirect yet
		return null; // You can also show a spinner here if you want
	}

	// If no user and no username in storage, redirect to login
	if (!user && !userName) {
		console.log("User not authenticated, redirecting to login");
		return <Navigate to="/login" />;
	}

	return children;
};

const App: React.FC = () => {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route path="/" element={<Navigate to="/login" />} />
					<Route path="/login" element={<LoginPage />} />
					<Route
						path="/dashboard"
						element={
							<ProtectedRoute>
								<DashboardPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/settings"
						element={
							<ProtectedRoute>
								<SettingsPage />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</Router>
		</AuthProvider>
	);
};

export default App;
