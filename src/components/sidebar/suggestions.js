import React, { useState, useEffect, useContext } from "react";
import FirebaseContext from "../../context/firebase";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import { getSuggestedProfiles } from "../../services/firebase";
import SuggestedProfile from './suggested-profile'

export default function Suggestions({ userId, following, loggedInUserDocId}) {
	const [profiles, setProfiles] = useState(null);

	useEffect(() => {
		async function suggestedProfiles() {
			const response = await getSuggestedProfiles(userId, following);
			setProfiles(response);
		}
		if (userId) {
			suggestedProfiles();
		}
		console.log("profiles", profiles);
	}, [userId]);

	return !profiles ? (
		<Skeleton count={1} height={150} className="mt-t5" />
	) : profiles.length > 0 ? (
		<div className="rounded flex flex-col">
			<div className="text-sm flex items-center align-items justify-between mb-2">
				<p className="font-bold tetxt-gray-base">Suggestion for you</p>
			</div>
			<div className="mt-4 grid gap-5">
				{profiles.map((profile) => {
					return <SuggestedProfile
						key={profile.docId}
						profileDocId={profile.docId}
						username={profile.username}
						profileId={profile.userId}
						userId={userId}
						loggedInUserDocId = {loggedInUserDocId}
					/>;
				})}
			</div>
		</div>
	) : null;
}

Suggestions.propTypes = {
	userId: PropTypes.string,
	following: PropTypes.array,
	loggedInUserDocId: PropTypes.string
};
