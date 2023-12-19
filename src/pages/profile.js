import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserByUsername } from "../services/firebase";
import * as ROUTES from "../constants/routes";
import Header from "../components/header";
import userProfile from "../components/profile";

export default function Profile() {
	const { username } = useParams();
	const [user, setUser] = useState(null);
	const [userExists, setUserExists] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		async function checkUserExists() {
			const user = await getUserByUsername(username);
			if (user.length > 0) {
				setUser(user[0]);
				setUserExists(true);
			} else {
				navigate(ROUTES.NOT_FOUND);
			}
		}
		checkUserExists();
		console.log("user: ", user);
	}, [username]);

	return userExists ? (
		<div className="bg-gray-background">
			<Header />
			<userProfile username={username} />
			<div className="mx-auto max-w-screen-lg">{user.fullName}</div>
		</div>
	) : null;
}
