import { Badge } from "@/components/ui/badge";
import type { Todo } from "@/lib/types/todos/todos";
import TodoCardMobile from "./todo-card-mobile";

interface MobileListViewProps {
	todos: Todo[];
}

export default function MobileListView({ todos }: MobileListViewProps) {
	const pendingTodos = todos.filter((todo) => todo.status === "Pending");
	const inProgressTodos = todos.filter((todo) => todo.status === "InProgress");
	const doneTodos = todos.filter((todo) => todo.status === "Completed");

	return (
		<div className="space-y-6">
			{/* Pending Section */}
			{pendingTodos.length > 0 && (
				<div>
					<div className="flex items-center gap-2 mb-4">
						<h3 className="font-semibold text-lg text-gray-900">
							Tareas Pendientes
						</h3>
						<Badge variant="secondary" className="text-xs">
							{pendingTodos.length}
						</Badge>
					</div>
					{pendingTodos.map((todo) => (
						<TodoCardMobile key={todo.id} todo={todo} />
					))}
				</div>
			)}

			{/* In Progress Section */}
			{inProgressTodos.length > 0 && (
				<div>
					<div className="flex items-center gap-2 mb-4">
						<h3 className="font-semibold text-lg text-gray-900">
							Tareas En Proceso
						</h3>
						<Badge variant="secondary" className="text-xs">
							{inProgressTodos.length}
						</Badge>
					</div>
					{inProgressTodos.map((todo) => (
						<TodoCardMobile key={todo.id} todo={todo} />
					))}
				</div>
			)}

			{/* Done Section */}
			{doneTodos.length > 0 && (
				<div>
					<div className="flex items-center gap-2 mb-4">
						<h3 className="font-semibold text-lg text-gray-900">
							Tareas Completadas
						</h3>
						<Badge variant="secondary" className="text-xs">
							{doneTodos.length}
						</Badge>
					</div>
					{doneTodos.map((todo) => (
						<TodoCardMobile key={todo.id} todo={todo} />
					))}
				</div>
			)}

			{todos.length === 0 && (
				<div className="text-center py-12">
					<p className="text-muted-foreground">No tasks found</p>
				</div>
			)}
		</div>
	);
}
