import { z } from "zod";

export interface Todo {
	id: number;
	title: string;
	description: string;
	dueDate: string;
	userId: number;
	status: TodoStatus;
	created_at: string;
	updated_at: string;
}

export type TodoStatus = "Pending" | "InProgress" | "Completed";

export const Create_Todo_Schema = z.object({
	title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
	description: z
		.string()
		.min(3, "La descripción debe tener al menos 3 caracteres"),
	dueDate: z
		.string()
		.min(10, "La fecha de vencimiento debe tener al menos 10 caracteres"),
	status: z.enum(["Pending", "InProgress", "Completed"]),
	userId: z.number(),
});

export type CreateTodo = z.infer<typeof Create_Todo_Schema>;

export const Update_Todo_Schema = z.object({
	id: z.number(),
	title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
	description: z
		.string()
		.min(3, "La descripción debe tener al menos 3 caracteres"),
	dueDate: z
		.string()
		.min(10, "La fecha de vencimiento debe tener al menos 10 caracteres"),
	status: z.enum(["Pending", "InProgress", "Completed"]),
});

export type UpdateTodo = z.infer<typeof Update_Todo_Schema> & { id: number };

export const TodoStatus: { value: TodoStatus; label: string }[] = [
	{ value: "Pending", label: "Pendiente" },
	{ value: "InProgress", label: "En Progreso" },
	{ value: "Completed", label: "Completado" },
];
