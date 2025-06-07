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
import { useAuth } from "@/lib/providers/authProvider";
import { CreateTodo } from "@/lib/services/todos/todos";
import {
	type CreateTodo as CreateTodoType,
	Create_Todo_Schema,
} from "@/lib/types/todos/todos";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function CreateTodoModal() {
	const { user } = useAuth();
	const [open, setOpen] = useState(false);
	const queryClient = useQueryClient();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
	} = useForm<CreateTodoType>({
		resolver: zodResolver(Create_Todo_Schema),
		defaultValues: {
			title: "",
			description: "",
			dueDate: "",
			status: "Pending",
			userId: user?.id,
		},
		mode: "onChange",
	});

	const createTodoMutation = useMutation({
		mutationFn: async (data: CreateTodoType) => CreateTodo(data),
		onSuccess: (data) => {
			toast.success(data.message);
			reset();
			setOpen(false);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["dashboard-todos"] });
		},
	});

	const onSubmit = (data: CreateTodoType) => {
		const dateObject = parseISO(data.dueDate);
		const formattedDate = format(dateObject, "yyyy-MM-dd HH:mm:ss");
		createTodoMutation.mutate({ ...data, dueDate: formattedDate });
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="sm">
					<Plus className="h-4 w-4 mr-2" />
					Add Task
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
							onChange={(c) => setValue("status", c)}
							classNames="w-full"
						/>
						{/* <Input {...register("status")} type="text" required /> */}
						{errors.status && (
							<p className="text-red-500 text-sm">{errors.status.message}</p>
						)}
					</div>

					<Button
						type="submit"
						className="w-full bg-red-700 hover:bg-red-800"
						disabled={createTodoMutation.isPending}
					>
						{createTodoMutation.isPending ? (
							<span className="animate-spin">Crear</span>
						) : (
							"Crear"
						)}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
