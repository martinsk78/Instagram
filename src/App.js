import { lazy, Suspense } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useNavigate,
} from "react-router-dom";
import * as ROUTES from "./constants/routes";
import UserContext from "./context/user";
import useAuthListener from "./hooks/use-auth-listener";

import ProtectedRoute from "./helpers/protected-route";

const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/sign-up"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Profile = lazy(() => import("./pages/profile"));
const NotFound = lazy(() => import("./pages/not-found"));

// ... (imports and other code)

export default function App() {
	const { user } = useAuthListener();

	return (
		<UserContext.Provider value={{ user }}>
			<Router>
				<Suspense fallback="...Loading">
					<Routes>
						<Route path={ROUTES.LOGIN} element={<Login />} />
						<Route path={ROUTES.SIGN_UP} element={<SignUp />} />
						<Route path={ROUTES.PROFILE} element={<Profile />} />

						{user ? (
							<Route
								path={ROUTES.DASHBOARD}
								element={<Dashboard />}
							/>
						) : (
							<Route path={ROUTES.LOGIN} element={<Login />} />
						)}
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Suspense>
			</Router>
		</UserContext.Provider>
	);
}
