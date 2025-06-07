import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TodoStatusSelect from "@/components/ui/todo-status-select";
import { UpdateTodo } from "@/lib/services/todos/todos";
import {
	type Todo,
	type UpdateTodo as UpdateTodoType,
	Update_Todo_Schema,
} from "@/lib/types/todos/todos";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { Loader2, PencilIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface UpdateTodoModalProps {
	todo: Todo;
}

export default function UpdateTodoModal({ todo }: UpdateTodoModalProps) {
	const queryClient = useQueryClient();
	const [open, setOpen] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<UpdateTodoType>({
		resolver: zodResolver(Update_Todo_Schema),
		defaultValues: {
			title: todo.title,
			description: todo.description,
			dueDate: format(parseISO(todo.dueDate), "yyyy-MM-dd'T'HH:mm"),
			status: todo.status,
			id: todo.id,
		},
		mode: "onChange",
	});

	const updateTodoMutation = useMutation({
		mutationFn: async (data: UpdateTodoType) => UpdateTodo(data),
		onSuccess: (data) => {
			toast.success(data.message);
			setOpen(false);
		},
		onError: (error) => {
			toast.error(error.message || "Error al actualizar la tarea");
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["dashboard-todos"] });
		},
	});

	const onSubmit = (data: UpdateTodoType) => {
		const dateObject = parseISO(data.dueDate);
		const formattedDate = format(dateObject, "yyyy-MM-dd HH:mm:ss");
		updateTodoMutation.mutate({ ...data, dueDate: formattedDate });
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="ghost" size="icon">
					<PencilIcon className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Crear Tarea</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div className="space-y-2">
						<Label>Título</Label>
						<Input {...register("title")} type="text" required />
						{errors.title && (
							<p className="text-red-500 text-sm">{errors.title.message}</p>
						)}
					</div>
					<div className="space-y-2">
						<Label>Descripción</Label>
						<Input {...register("description")} type="text" required />
						{errors.description && (
							<p className="text-red-500 text-sm">
								{errors.description.message}
							</p>
						)}
					</div>
					<div className="space-y-2">
						<Label>Fecha de Vencimiento</Label>
						<Input
							{...register("dueDate")}
							type="datetime-local"
							required
							className="w-full"
						/>
						{errors.dueDate && (
							<p className="text-red-500 text-sm">{errors.dueDate.message}</p>
						)}
					</div>
					<div className="space-y-2">
						<Label>Estado</Label>
						<TodoStatusSelect
							{...register("status")}
							selectedValue={todo.status}
							onChange={(c) => setValue("status", c)}
							classNames="w-full"
						/>
						{errors.status && (
							<p className="text-red-500 text-sm">{errors.status.message}</p>
						)}
					</div>

					<Button
						type="submit"
						className="w-full bg-red-700 hover:bg-red-800"
						disabled={updateTodoMutation.isPending}
					>
						{updateTodoMutation.isPending ? (
							<Loader2 className="animate-spin" />
						) : (
							"Actualizar Tarea"
						)}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
