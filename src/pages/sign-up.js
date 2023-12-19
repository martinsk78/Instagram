import React, { useContext, useState, useEffect, createRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { doesUsernameExist } from "../services/firebase";

export default function SignUp() {
	const navigation = useNavigate();
	const location = useLocation();
	const { firebaseApp } = useContext(FirebaseContext);

	const [username, setUsername] = useState("");
	const [fullName, setFullName] = useState("");

	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");

	const [error, setError] = useState("");
	const isInvalid =
		password === "" ||
		emailAddress === "" ||
		username === "" ||
		fullName === "";

	const handleSignUp = async (e) => {
		e.preventDefault();

		const usernameExists = await doesUsernameExist(username);
		if (!usernameExists){
			try {
				//authentication
				const createdUserResult = await firebaseApp
					.auth()
					.createUserWithEmailAndPassword(emailAddress, password);
				await createdUserResult.user.updateProfile({
					displayName: username,
				});
	
				//firebase user collection (create a document)\
				await firebaseApp.firestore().collection("users").add({
					userId: createdUserResult.user.uid,
					username: username.toLowerCase(),
					fullName,
					emailAddress: emailAddress.toLowerCase(),
					following: [],
					dateCreated: Date.now(),
				});
				navigation(ROUTES.DASHBOARD)
	
			} catch (error) {
				setUsername('')
				setFullName('')
				setEmailAddress('')
				setPassword('')
				setError(error.message)
			}
		}else{
			setError('That username is already taken, please try another one')
		}
		
	};

	useEffect(() => {
		document.title = "SignUp - Instagram";
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

					<form onSubmit={handleSignUp} method="POST">
						<input
							aria-label="Enter your Username"
							type="text"
							placeholder="Username"
							className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
							onChange={({ target }) => setUsername(target.value)}
							value={username || ""}
						/>
						<input
							aria-label="Enter your Full Name"
							type="text"
							placeholder="Full Name"
							className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
							onChange={({ target }) => setFullName(target.value)}
							value={fullName || ""}
						/>
						<input
							aria-label="Enter your Email Address"
							type="Email Address"
							placeholder="Email Address"
							className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
							onChange={({ target }) =>
								setEmailAddress(target.value)
							}
							value={emailAddress || ""}
						/>

						<input
							aria-label="Enter your password"
							type="password"
							placeholder="password"
							className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
							onChange={({ target }) => setPassword(target.value)}
							value={password || ""}
						/>
						<button
							disabled={isInvalid}
							type="submit"
							className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
								isInvalid && "opacity-50"
							}`}
						>
							Sign Up
						</button>
					</form>
				</div>
				<div className="flex justify-center items-center flex-col w-full bg-white p-4 border rounded border-gray-primary">
					<p className="text-sm text-black">
						Have an account?{` `}
						<Link
							to={ROUTES.LOGIN}
							className="font-bold text-blue-medium cursor-pointer"
						>
							Log In
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
