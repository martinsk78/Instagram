import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";

export default function Login() {
	const navigation = useNavigate();
	const location = useLocation();
	const { firebaseApp } = useContext(FirebaseContext);

	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");

	const [error, setError] = useState("");

	const isInvalid = password === "" || emailAddress === "";

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			await firebaseApp
				.auth()
				.signInWithEmailAndPassword(emailAddress, password);
			navigation(ROUTES.DASHBOARD);
		} catch (error) {
			setEmailAddress("");
			setPassword("");
			setError(error.message);
			console.log(error);
		}
	};
	useEffect(() => {
		document.title = "Login - Instagram";
	}, []);

	return (
		<div className="container flex mx-auto max-w-screen-md items-center h-screen">
			<div className="flex w-3/5">
				<img src="/images/iphone-with-profile.jpg" />
			</div>
			<div className="flex flex-col w-2/5">
				<div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
					<h1 className="flex justify-center w-full">
						<img
							src="/images/logo.png"
							alt="Instagram"
							className="mt-2 w-6/12 mb-4"
						/>
					</h1>
					{error && (
						<p className="mb-4 text-xs text-red-primary">{error}</p>
					)}

					<form onSubmit={handleLogin} method="POST">
						<input
							aria-label="Enter your email address"
							type="text"
							placeholder="Email address"
							className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
							onChange={({ target }) =>
								setEmailAddress(target.value)
							}
						/>
						<input
							aria-label="Enter your password"
							type="password"
							placeholder="password"
							className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
							onChange={({ target }) => setPassword(target.value)}
						/>
						<button
							disabled={isInvalid}
							type="submit"
							className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
								isInvalid && "opacity-50"
							}`}
						>
							Log In
						</button>
					</form>
				</div>
				<div className="flex justify-center items-center flex-col w-full bg-white p-4 border rounded border-gray-primary">
					<p className="text-sm text-black">
						Don't have an account?{` `}
						<Link
							to={ROUTES.SIGN_UP}
							className="font-bold text-blue-medium cursor-pointer"
						>
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
