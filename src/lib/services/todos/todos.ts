import type { ApiRespone } from "@/lib/types/common";
import type { CreateTodo, Todo, UpdateTodo } from "@/lib/types/todos/todos";
import axiosInstance from "../axiosInterceptor";

export async function GetTodos() {
	try {
		const response = await axiosInstance.get<ApiRespone<Todo[]>>("/todos");
		return response.data;
	} catch (error) {
		console.error("Error fetching todos:", error);
		throw error;
	}
}

export async function GetTodoById(todoId: number): Promise<ApiRespone<Todo>> {
	try {
		const response = await axiosInstance.get<ApiRespone<Todo>>(
			`/todos/${todoId}`,
		);
		return response.data;
	} catch (error) {
		console.error("Error fetching todo by ID:", error);
		throw error;
	}
}

export async function CreateTodo(data: CreateTodo): Promise<ApiRespone<Todo>> {
	try {
		const response = await axiosInstance.post<ApiRespone<Todo>>("/todos", data);
		return response.data;
	} catch (error) {
		console.error("Error creating todo:", error);
		throw error;
	}
}

export async function UpdateTodo(data: UpdateTodo) {
	try {
		const response = await axiosInstance.put<ApiRespone<Todo>>(
			`/todos/${data.id}`,
			data,
		);
		return response.data;
	} catch (error) {
		console.error("Error updating todo:", error);
		throw error;
	}
}

export async function DeleteTodo(todoId: number) {
	try {
		const response = await axiosInstance.delete<ApiRespone<Todo>>(
			`/todos/${todoId}`,
		);
		return response.data;
	} catch (error) {
		console.error("Error deleting todo:", error);
		throw error;
	}
}
