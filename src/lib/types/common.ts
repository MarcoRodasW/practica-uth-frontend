export type ApiRespone<T> = {
	data: T;
	status: boolean;
	message: string;
	errors?: string[];
};

export const baseApiUrl =
	import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";
