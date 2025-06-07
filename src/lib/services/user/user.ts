import { type ApiRespone, baseApiUrl } from "@/lib/types/common";
import type {
	LoginResponse,
	Login_Schema,
	Register_Schema,
	User,
} from "@/lib/types/user/user";
import type { z } from "zod";

export async function RegisterUser(
	data: z.infer<typeof Register_Schema>,
): Promise<ApiRespone<User>> {
	try {
		const response = await fetch(`${baseApiUrl}/auth/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			throw new Error("Error creating user");
		}

		return response.json();
	} catch (error) {
		console.error("Error creating user:", error);
		throw error;
	}
}

export async function LoginUser(
	data: z.infer<typeof Login_Schema>,
): Promise<LoginResponse> {
	try {
		const response = await fetch(`${baseApiUrl}/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			throw new Error("Error logging in user");
		}

		return response.json();
	} catch (error) {
		console.error("Error logging in user:", error);
		throw error;
	}
}
