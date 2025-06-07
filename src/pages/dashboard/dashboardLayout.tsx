import { useAuth } from "@/lib/providers/authProvider";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

export default function DashboardLayout() {
	const { isAuthenticated } = useAuth();
	let navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/");
		}
	}, [isAuthenticated, navigate]);
	return <Outlet />;
}
