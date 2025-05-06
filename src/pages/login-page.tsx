import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../auth/authenticator";
import Logo from "../components/atoms/logo";
import Alert from "../components/atoms/alert";

const LoginPage: React.FC = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);

	const [loading, setLoading] = useState(false);

	const handleLogin = async (e?: React.FormEvent) => {
		e?.preventDefault();
		setError(null);
		setLoading(true);

		if (!username || !password) {
			console.error("Username or password is empty");
			setError("Please enter both username and password");
			setLoading(false);
			return;
		}

		try {
			const token = await signIn(username, password);
			sessionStorage.setItem("accessToken", token);
			localStorage.setItem("username", username);
			navigate("/dashboard");
		} catch (err) {
			const errorMessage = (err as Error)?.message || "Login failed";
			console.error("Login failed", err);
			setError(errorMessage || "Login failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-screen h-screen flex items-center justify-center">
			<div className="bg-gradient-to-r from-gray-800 to-gray-600 flex flex-col items-center justify-center gap-4 py-12 px-4 min-w-md rounded-xl drop-shadow-2xl">
				<Logo variant="md" />
				<span className="text-2xl text-gray-900 dark:text-white uppercase">
					Central Admin
				</span>
				<form
					className="flex flex-col items-center justify-center gap-4 p-4 w-full"
					onSubmit={handleLogin}
				>
					<input
						type="text"
						placeholder="Username"
						autoComplete="username"
						value={username}
						className="border-2 border-gray-300 rounded-md p-2 w-full text-white"
						onChange={(e) => setUsername(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Password"
						autoComplete="current-password"
						value={password}
						className="border-2 border-gray-300 rounded-md p-2 w-full text-white"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<div className="flex items-center justify-end w-full">
						<a
							href="#"
							className="text-blue-600 hover:underline dark:text-blue-400"
						>
							forgot password?
						</a>
					</div>

					<button
						className={`bg-gray-950 text-white py-2 px-4 rounded w-full flex items-center justify-center gap-2 ${
							loading ? "opacity-50" : ""
						}`}
						type="submit"
						disabled={loading}
					>
						{loading ? (
							<>
								<span>Signing you in...</span>
								<svg
									className="animate-spin h-4 w-4 text-white"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									/>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
									/>
								</svg>
							</>
						) : (
							"Login"
						)}
					</button>
					{error && (
						<Alert
							message={error}
							variant="error"
							onDismiss={() => setError("")}
						></Alert>
					)}
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
