import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { Todo } from "@/lib/types/todos/todos";
import { CalendarDays } from "lucide-react";
import DeleteTodoButton from "./delete-todo-button";
import UpdateTodoModal from "./update-todo-modal";

interface TodoCardMobileProps {
	todo: Todo;
}

export default function TodoCardMobile({ todo }: TodoCardMobileProps) {
	const getStatusColor = () => {
		switch (todo.status) {
			case "Pending":
				return "bg-yellow-100 text-yellow-800 border-yellow-200";
			case "InProgress":
				return "bg-blue-100 text-blue-800 border-blue-200";
			case "Completed":
				return "bg-green-100 text-green-800 border-green-200";
			default:
				return "bg-gray-100 text-gray-800 border-gray-200";
		}
	};

	return (
		<Card className="mb-3">
			<CardHeader className="">
				<div className="flex items-start justify-between">
					<div className="flex-1">
						<CardTitle className="text-base font-medium mb-1">
							{todo.title}
						</CardTitle>
						<CardDescription className="text-sm">
							{todo.description}
						</CardDescription>
					</div>
					<div className="space-x-1">
						<UpdateTodoModal todo={todo} />
						<DeleteTodoButton todo={todo} />
					</div>
				</div>
			</CardHeader>
			<CardContent className="">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-1 text-sm text-muted-foreground">
						<CalendarDays className="h-4 w-4" />
						{todo.dueDate}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
