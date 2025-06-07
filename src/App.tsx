import LoginForm from "./components/pages/login/login-form";
import RegisterForm from "./components/pages/login/register-form";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import LoginImage from "/assets/uth-logo.png";

enum TABS_KEYS {
	LOGIN = "login",
	REGISTER = "register",
}

function App() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-yellow-50 p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center space-y-4">
					<div className="flex justify-center">
						<img
							src={LoginImage}
							alt="UTH Florida University Logo"
							width={120}
							height={120}
							className="object-contain"
						/>
					</div>
					<div>
						<CardTitle className="text-2xl font-bold text-red-800">
							Welcome
						</CardTitle>
						<CardDescription>
							Access your UTH Florida University account
						</CardDescription>
					</div>
				</CardHeader>
				<CardContent>
					<Tabs defaultValue={TABS_KEYS.LOGIN} className="w-full">
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value={TABS_KEYS.LOGIN}>Login</TabsTrigger>
							<TabsTrigger value={TABS_KEYS.REGISTER}>Register</TabsTrigger>
						</TabsList>

						<TabsContent value={TABS_KEYS.LOGIN} className="space-y-4 mt-6">
							<LoginForm />
						</TabsContent>

						<TabsContent value={TABS_KEYS.REGISTER} className="space-y-4 mt-6">
							<RegisterForm />
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</div>
	);
}

export default App;
