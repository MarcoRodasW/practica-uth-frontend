import { Button } from "@/components/ui/button";
import { DeleteTodo } from "@/lib/services/todos/todos";
import type { Todo } from "@/lib/types/todos/todos";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";

interface DeleteTodoButtonProps {
	todo: Todo;
}

export default function DeleteTodoButton({ todo }: DeleteTodoButtonProps) {
	const queryClient = useQueryClient();

	const deleteTodoMutation = useMutation({
		mutationFn: async (todoId: number) => DeleteTodo(todoId),
		onSuccess: (data) => {
			toast.success(data.message);
		},
		onError: (error) => {
			toast.error(error.message || "Error al eliminar la tarea");
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["dashboard-todos"] });
		},
	});

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={() => deleteTodoMutation.mutate(todo.id)}
		>
			<Trash2Icon className="h-4 w-4" />
		</Button>
	);
}
