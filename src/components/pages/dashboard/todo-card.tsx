import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { Todo } from "@/lib/types/todos/todos";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CalendarDays } from "lucide-react";
import DeleteTodoButton from "./delete-todo-button";
import UpdateTodoModal from "./update-todo-modal";

interface TodoCardProps {
	todo: Todo;
	isDragging?: boolean;
}
export default function TodoCard({ todo, isDragging = false }: TodoCardProps) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging: isSortableDragging,
	} = useSortable({
		id: todo.id,
		data: {
			type: "todo",
			todo,
		},
		disabled: todo.status === "Completed",
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<Card
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className={cn(
				"cursor-grab active:cursor-grabbing transition-all hover:shadow-md",
				{
					"cursor-not-allowed opacity-70": todo.status === "Completed",
				},
			)}
		>
			<CardHeader className="flex flex-row items-start justify-between">
				<div className="flex flex-col gap-1">
					<CardTitle className="text-sm font-medium">{todo.title}</CardTitle>
					<CardDescription className="text-xs">
						{todo.description}
					</CardDescription>
				</div>
				<div className="flex items-center gap-2">
					<UpdateTodoModal todo={todo} />
					<DeleteTodoButton todo={todo} />
				</div>
			</CardHeader>
			<CardContent className="">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-1 text-xs text-muted-foreground">
						<CalendarDays className="h-3 w-3" />
						{todo.dueDate}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
