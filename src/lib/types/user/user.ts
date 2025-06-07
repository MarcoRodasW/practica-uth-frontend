import z from "zod";
import type { ApiRespone } from "../common";

export interface User {
	id: number;
	username: string;
	email: string;
}

export interface CreateUser {
	username: string;
	email: string;
	password: string;
}

export type UpdateUser = Partial<CreateUser>;

export const Login_Schema = z.object({
	email: z.string().email("Correo Electrónico no válido"),
	password: z.string().min(5, "Contraseña debe tener al menos 5 caracteres"),
});

export const Register_Schema = z.object({
	username: z.string().min(3, "Usuario debe tener al menos 3 caracteres"),
	email: z.string().email("Correo Electrónico no válido"),
	password: z.string().min(5, "Contraseña debe tener al menos 5 caracteres"),
});

export type LoginResponse = ApiRespone<{
	user: User;
	token: string;
}>;
