import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import type { User } from "../types/user/user";

interface AuthContextType {
	token: string | null;
	isAuthenticated: boolean;
	setToken: (newToken: string | null) => void;
	setUser: (user: User | null) => void;
	user: User | null;
	logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [token, setTokenState] = useState<string | null>(
		localStorage.getItem("authToken"),
	);
	const [user, setUserState] = useState<User | null>(
		JSON.parse(localStorage.getItem("user") || "null"),
	);

	const setToken = (newToken: string | null) => {
		setTokenState(newToken);
	};

	const setUser = (user: User | null) => {
		setUserState(user);
		if (user) {
			localStorage.setItem("user", JSON.stringify(user));
		} else {
			localStorage.removeItem("user");
		}
	};

	const logoutUser = () => {
		localStorage.removeItem("authToken");
		setToken(null);
		localStorage.removeItem("user");
		setUser(null);
	};

	useEffect(() => {
		if (token) {
			localStorage.setItem("authToken", token);
		} else {
			localStorage.removeItem("authToken");
		}
	}, [token]);

	const contextValue = useMemo(
		() => ({
			token,
			isAuthenticated: !!token,
			setToken,
			setUser,
			logoutUser,
			user,
		}),
		[token],
	);

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
