import { UpdateTodo } from "@/lib/services/todos/todos";
import type {
	Todo,
	TodoStatus,
	UpdateTodo as UpdateTodoType,
} from "@/lib/types/todos/todos";
import {
	DndContext,
	type DragEndEvent,
	DragOverlay,
	type DragStartEvent,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import BoardColumn from "./board-column";
import MobileListView from "./mobile-list-view";
import TodoCard from "./todo-card";

interface TodosBoardProps {
	todos: Todo[];
}
export default function TodosBoard({ todos }: TodosBoardProps) {
	const queryClient = useQueryClient();
	const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 5,
			},
		}),
	);

	const updateTodoStatusMutation = useMutation({
		mutationFn: ({
			data,
			newStatus,
		}: { data: UpdateTodoType; newStatus: TodoStatus }) =>
			UpdateTodo({ ...data, status: newStatus }),
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["dashboard-todos"] });
		},
	});

	const handleDragStart = (event: DragStartEvent) => {
		const todo = todos.find((t) => t.id === event.active.id);
		setActiveTodo(todo || null);
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (
			over &&
			active.data.current?.todo?.status !== over.data.current?.status
		) {
			const activeTodo = active.data.current?.todo as Todo;
			const newStatus = over.data.current?.status as TodoStatus;
			updateTodoStatusMutation.mutate({
				data: activeTodo,
				newStatus: newStatus,
			});
			setActiveTodo(null);
		}
		console.log("DragEnd", event);
	};

	const pendingTodos = todos.filter((todo) => todo.status === "Pending");
	const inProgressTodos = todos.filter((todo) => todo.status === "InProgress");
	const doneTodos = todos.filter((todo) => todo.status === "Completed");

	return (
		<>
			<DndContext
				onDragStart={handleDragStart}
				sensors={sensors}
				onDragEnd={handleDragEnd}
			>
				<div className="hidden lg:grid lg:grid-cols-3 gap-6">
					<BoardColumn
						title="Tareas Pendientes"
						status="Pending"
						todos={pendingTodos}
					/>
					<BoardColumn
						title="Tareas En Proceso"
						status="InProgress"
						todos={inProgressTodos}
					/>
					<BoardColumn
						title="Tareas Completadas"
						status="Completed"
						todos={doneTodos}
					/>
				</div>

				{/* Mobile List View */}
				<div className="lg:hidden">
					<MobileListView todos={todos} />
				</div>

				<DragOverlay>
					{activeTodo ? (
						<div className="scale-105">
							<TodoCard todo={activeTodo} isDragging />
						</div>
					) : null}
				</DragOverlay>
			</DndContext>
		</>
	);
}
