import { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import Header from "./header";
import {
	getUserByUsername,
	getUserPhotosByUsername,
} from "../../services/firebase";

function Profile({ username }) {
	const reducer = (state, newState) => ({ ...state, ...newState });
	const initialState = {
		profile: {},
		photosCOllection: [],
		followerrCount: 0,
	};
	const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
		reducer,
		initialState
	);
	useEffect(() => {
		async function getProfileInfoAndPhotos() {
			const [{ ...user }] = await getUserByUsername(username);
			const photos = getUserPhotosByUsername(username);
			dispatch({
				profile: user,
				photosCollection: photos,
				followerCount: user.followers.length,
			});
		}

		getProfileInfoAndPhotos();
	}, [username]);

	return (
		<div>
			<Header />
		</div>
	);
}

Profile.propTypes = {
	username: PropTypes.string.isRequired,
};

export default Profile;
