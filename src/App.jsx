import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import AdminProtectedRoute from "./pages/AdminProtectedRoute";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./pages/ProtectedRoute";

export default function App() {
	const queryClient = new QueryClient({
		queryCache: new QueryCache({
			onError: (error) => {
				console.error(error.message);
			},
		}),
		defaultOptions: {
			queries: {
				staleTime: 0,
			},
		},
	});

	return (
		<>
			<QueryClientProvider client={queryClient}>
				{/* <ReactQueryDevtools initialIsOpen={false}/>  */}
				<BrowserRouter>
					<Routes>
						<Route index element={<Navigate replace to="dashboard" />} />
						<Route
							path="dashboard"
							element={
								<ProtectedRoute>
									<Dashboard />
								</ProtectedRoute>
							}
						/>
						<Route path="auth/login" element={<Login />} />
						<Route
							path="auth/signup"
							element={
								<AdminProtectedRoute>
									<Signup />
								</AdminProtectedRoute>
							}
						/>

						<Route path="auth/reset-password" element={<ResetPassword />} />
					</Routes>
				</BrowserRouter>
			</QueryClientProvider>
		</>
	);
}
