import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/providers/authProvider";
import { LoginUser } from "@/lib/services/user/user";
import { Login_Schema } from "@/lib/types/user/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import type z from "zod";

export default function LoginForm() {
	const { setToken, setUser } = useAuth();
	let navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof Login_Schema>>({
		resolver: zodResolver(Login_Schema),
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "onChange",
	});

	const loginMutation = useMutation({
		mutationFn: async (data: z.infer<typeof Login_Schema>) => LoginUser(data),
		onSuccess: (data) => {
			if (data.data) {
				const { token, user } = data.data;
				setToken(token);
				setUser(user);
				navigate("/dashboard");
			}
			toast.success(data.message);
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const onSubmit = (data: z.infer<typeof Login_Schema>) => {
		loginMutation.mutate(data);
	};

	return (
		<form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
			<div className="space-y-2">
				<Label htmlFor="email">Correo Electrónico</Label>
				<Input
					{...register("email")}
					type="email"
					placeholder="student@uthflorida.edu"
					disabled={loginMutation.isPending}
					required
				/>
				{errors?.email && (
					<p className="text-sm text-destructive">{errors.email.message}</p>
				)}
			</div>
			<div className="space-y-2">
				<Label htmlFor="password">Contraseña</Label>
				<Input
					{...register("password")}
					type="password"
					required
					disabled={loginMutation.isPending}
				/>
				{errors?.password && (
					<p className="text-sm text-destructive">{errors.password.message}</p>
				)}
			</div>
			<Button
				type="submit"
				className="w-full bg-red-700 hover:bg-red-800"
				disabled={loginMutation.isPending}
			>
				{loginMutation.isPending ? (
					<Loader2 className="animate-spin" />
				) : (
					"Inicar Sesión"
				)}
			</Button>
		</form>
	);
}
