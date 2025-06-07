import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RegisterUser } from "@/lib/services/user/user";
import { Register_Schema } from "@/lib/types/user/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function RegisterForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<z.infer<typeof Register_Schema>>({
		resolver: zodResolver(Register_Schema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
		mode: "onChange",
	});
	const registerMutation = useMutation({
		mutationFn: async (data: z.infer<typeof Register_Schema>) =>
			RegisterUser(data),
		onSuccess: (data) => {
			toast.success(data.message);
			reset();
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const onSubmit = (data: z.infer<typeof Register_Schema>) => {
		registerMutation.mutate(data);
	};

	return (
		<form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
			<div className="space-y-2">
				<Label htmlFor="username">Usuario</Label>
				<Input {...register("username")} type="text" required />
				{errors?.username && (
					<p className="text-sm text-destructive">{errors.username.message}</p>
				)}
			</div>
			<div className="space-y-2">
				<Label htmlFor="email">Email</Label>
				<Input
					{...register("email")}
					type="email"
					placeholder="student@uthflorida.edu"
					required
				/>
				{errors?.email && (
					<p className="text-sm text-destructive">{errors.email.message}</p>
				)}
			</div>
			<div className="space-y-2">
				<Label htmlFor="password">Password</Label>
				<Input {...register("password")} type="password" required />
				{errors?.password && (
					<p className="text-sm text-destructive">{errors.password.message}</p>
				)}
			</div>
			<Button
				type="submit"
				className="w-full bg-red-700 hover:bg-red-800"
				disabled={registerMutation.isPending}
			>
				{registerMutation.isPending ? (
					<Loader2 className="animate-spin" />
				) : (
					"Crear Cuenta"
				)}
			</Button>
		</form>
	);
}
