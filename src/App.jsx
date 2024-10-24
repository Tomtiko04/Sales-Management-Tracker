import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import AdminProtectedRoute from "./pages/AdminProtectedRoute";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./pages/ProtectedRoute";
import RequestResetForm from "./features/authentication/RequestResetForm";
import useAuthUser from "./hook/useAuthUser";
import CategoryManagement from "./features/producer/category/CategoryManagement";

export default function App() {
	const { authUser } = useAuthUser();
	const allowedRoles = authUser?.user_metadata?.role;
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
				<ReactQueryDevtools />
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
						<Route
							path="category"
							element={
								<ProtectedRoute>
									<CategoryManagement />
								</ProtectedRoute>
							}
						/>
						<Route path="auth/login" element={<Login />} />
						<Route
							path="auth/signup"
							element={
								<AdminProtectedRoute allowedRoles={allowedRoles}>
									<Signup />
								</AdminProtectedRoute>
							}
						/>
						<Route path="auth/reset-password-request" element={<RequestResetForm />} />
						<Route path="auth/reset-password" element={<ResetPassword />} />
					</Routes>
				</BrowserRouter>
				<Toaster
					position="top-right"
					gutter={12}
					containerStyle={{ margin: "8px" }}
					toastOptions={{
						success: {
							duration: 3000,
						},
						error: {
							duration: 5000,
						},
						style: {
							fontSize: "16px",
							maxWidth: "500px",
							padding: "16px 24px",
							// backgroundColor: "bg-orange-500",
							// color: "text-white",
						},
					}}
				/>
			</QueryClientProvider>
		</>
	);
}