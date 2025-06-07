import { TodoStatus } from "@/lib/types/todos/todos";
import { cn } from "@/lib/utils";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./select";

export interface TodoStatusSelectProps {
	classNames?: string;
	selectedValue?: TodoStatus;
	onChange: (value: TodoStatus) => void;
}

export default function TodoStatusSelect({
	classNames,
	selectedValue = "Pending",
	onChange,
}: TodoStatusSelectProps) {
	return (
		<Select defaultValue={selectedValue} onValueChange={onChange}>
			<SelectTrigger className={cn("w-[180px]", classNames)}>
				<SelectValue placeholder="Seleccionar estado" />
			</SelectTrigger>
			<SelectContent>
				{TodoStatus.map((status) => (
					<SelectItem key={status.value} value={status.value}>
						{status.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
