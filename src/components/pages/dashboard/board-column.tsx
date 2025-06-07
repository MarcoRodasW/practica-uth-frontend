import { Badge } from "@/components/ui/badge";
import type { Todo, TodoStatus } from "@/lib/types/todos/todos";
import { useDroppable } from "@dnd-kit/core";
import {
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TodoCard from "./todo-card";

interface BoardColumnProps {
	title: string;
	status: TodoStatus;
	todos: Todo[];
}
export default function BoardColumn({
	status,
	title,
	todos,
}: BoardColumnProps) {
	const { setNodeRef, isOver } = useDroppable({
		id: `column-${status}`,
		data: {
			type: "column",
			status,
		},
	});

	const todoIds = todos.map((todo) => todo.id);

	const getColumnColor = () => {
		switch (status) {
			case "Pending":
				return "border-yellow-200 bg-yellow-50";
			case "InProgress":
				return "border-blue-200 bg-blue-50";
			case "Completed":
				return "border-green-200 bg-green-50";
			default:
				return "border-gray-200 bg-gray-50";
		}
	};

	return (
		<div className="flex-1 min-w-0">
			<div
				ref={setNodeRef}
				className={`rounded-lg p-4 h-full transition-all duration-200 border-2 ${
					isOver
						? `${getColumnColor()} border-dashed shadow-lg scale-105`
						: "bg-muted/50 border-transparent"
				}`}
			>
				<div className="flex items-center justify-between mb-4">
					<h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
						{title}
					</h3>
					<Badge variant="secondary" className="text-xs">
						{todos.length}
					</Badge>
				</div>
				<SortableContext items={todoIds} strategy={verticalListSortingStrategy}>
					<div
						className={`space-y-3 min-h-[400px] rounded-md transition-all duration-200 ${
							isOver
								? "bg-white/50 border-2 border-dashed border-current p-2"
								: ""
						}`}
					>
						{todos.map((todo) => (
							<TodoCard key={todo.id} todo={todo} />
						))}
						{todos.length === 0 && (
							<div
								className={`flex items-center justify-center h-32 text-muted-foreground text-sm transition-all duration-200 ${
									isOver ? "text-current font-medium" : ""
								}`}
							>
								{isOver ? "Drop here" : "No tasks"}
							</div>
						)}
					</div>
				</SortableContext>
			</div>
		</div>
	);
}
