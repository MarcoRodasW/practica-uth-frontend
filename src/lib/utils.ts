import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { User } from "./types/user/user";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getAuthToken(): string | null {
	try {
		const token = localStorage.getItem("authToken");
		return token;
	} catch (error) {
		console.error("Error getting auth token from localStorage:", error);
		return null;
	}
}

export function getUser(): User | null {
	try {
		const user = localStorage.getItem("user");
		return user ? JSON.parse(user) : null;
	} catch (error) {
		console.error("Error getting user ID from localStorage:", error);
		return null;
	}
}
