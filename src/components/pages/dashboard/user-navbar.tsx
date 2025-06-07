import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/providers/authProvider";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import CreateTodoModal from "./create-todo-modal";
import UTHLogo from "/assets/uth-logo-ext.png";

export default function UserNavbar() {
	const { logoutUser, user } = useAuth();
	let navigate = useNavigate();

	const handleLogout = () => {
		logoutUser();
		navigate("/");
	};

	return (
		<nav className="border-b bg-[#a21d22] shadow-sm">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
				<div className="flex flex-col sm:flex-row gap-5 justify-between items-center h-full">
					<div className="flex items-center gap-3">
						<img
							src={UTHLogo}
							alt="UTH Florida University"
							className="object-contain w-40 h-auto md:w-full"
						/>
						<p className="text-white text-lg text-center inline-flex flex-col">
							Bienvenido
							<span className="text-xl font-bold">{user?.username}</span>
						</p>
					</div>
					<div className="flex items-center gap-4">
						<CreateTodoModal />
						<Button variant="outline" size="sm" onClick={handleLogout}>
							<LogOut className="h-4 w-4 mr-2" />
							Logout
						</Button>
					</div>
				</div>
			</div>
		</nav>
	);
}
