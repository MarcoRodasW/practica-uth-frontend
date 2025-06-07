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
