import React, { createContext, useContext, useState, useEffect } from "react";
import {
	CognitoUser,
	CognitoUserPool,
	CognitoUserSession,
} from "amazon-cognito-identity-js";

// --- Environment variables ---
const UserPoolId = import.meta.env.VITE_USERPOOLID;
const ClientId = import.meta.env.VITE_CLIENTID;

const userPool = new CognitoUserPool({
	UserPoolId,
	ClientId,
});

// --- Types for context ---
interface AuthContextType {
	user: CognitoUser | null;
	userName: string | null;
	signOut: () => void;
	loading: boolean;
}

// --- Create the context ---
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- Provider ---
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<CognitoUser | null>(null);
	const [userName, setUserName] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const currentUser = userPool.getCurrentUser();

		if (currentUser) {
			currentUser.getSession(
				(err: Error | null, session: CognitoUserSession | null) => {
					if (err || !session || !session.isValid()) {
						setUser(null);
						setUserName(null);
					} else {
						setUser(currentUser);
						setUserName(currentUser.getUsername());
						// Store in localStorage for persistence
						localStorage.setItem(
							"username",
							currentUser.getUsername()
						);
					}
					setLoading(false);
				}
			);
		} else {
			// Fall back to localStorage if possible
			const storedUsername = localStorage.getItem("username");
			if (storedUsername) {
				setUser(null); // Can't restore CognitoUser instance directly
				setUserName(storedUsername);
			} else {
				setUser(null);
				setUserName(null);
			}
			setLoading(false);
		}
	}, []);

	const signOut = () => {
		const currentUser = userPool.getCurrentUser();
		if (currentUser) {
			currentUser.signOut();
		}
		setUser(null);
		setUserName(null);
		sessionStorage.removeItem("accessToken");
	};

	return (
		<AuthContext.Provider value={{ user, userName, signOut, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

// --- Hook ---
export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
