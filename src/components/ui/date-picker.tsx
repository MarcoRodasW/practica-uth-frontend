import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

interface DatePickerProps {
	onDateSelect: (date: Date | undefined) => void;
	selectedDate?: Date;
}

export function DatePicker({ onDateSelect, selectedDate }: DatePickerProps) {
	const [date, setDate] = useState<Date | undefined>(selectedDate);

	const handleDateChange = (newDate: Date | undefined) => {
		setDate(newDate);
		onDateSelect(newDate);
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					data-empty={!date}
					className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
				>
					<CalendarIcon />
					{date ? format(date, "PPP") : <span>Seleccione una fecha</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar mode="single" selected={date} onSelect={handleDateChange} />
			</PopoverContent>
		</Popover>
	);
}
