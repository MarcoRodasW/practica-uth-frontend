import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "sonner";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./lib/providers/authProvider.tsx";
import DashboardPage from "./pages/dashboard/dashboard.tsx";
import DashboardLayout from "./pages/dashboard/dashboardLayout.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<App />} />
						<Route element={<DashboardLayout />}>
							<Route path="/dashboard" element={<DashboardPage />} />
						</Route>
					</Routes>
					<Toaster
						richColors
						toastOptions={{
							closeButton: true,
						}}
					/>
				</BrowserRouter>
			</AuthProvider>
		</QueryClientProvider>
	</StrictMode>,
);
