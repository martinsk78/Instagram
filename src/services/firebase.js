import { firebaseApp, FieldValue } from "../lib/firebase";

export async function doesUsernameExist(username) {
	const result = await firebaseApp
		.firestore()
		.collection("users")
		.where("username", "==", username)
		.get();

	return Boolean(result.docs.length);
}
export async function getUserByUsername(username) {
	const result = await firebaseApp
		.firestore()
		.collection("users")
		.where("username", "==", username)
		.get();

	const user = result.docs.map((item) => ({
		...item.data(),
		docId: item.id,
	}));

	return user;
}
export async function getUserByUserId(userId) {
	const result = await firebaseApp
		.firestore()
		.collection("users")
		.where("userId", "==", userId)
		.get();

	const user = result.docs.map((item) => ({
		...item.data(),
		docId: item.id,
	}));
	console.log(userId);

	return user;
}

export async function getSuggestedProfiles(userId, following) {
	const result = await firebaseApp
		.firestore()
		.collection("users")
		.limit(10)
		.get();
	console.log(
		result.docs.map((user) => ({ ...user.data(), docId: user.id })).id
	);
	return result.docs
		.map((user) => ({ ...user.data(), docId: user.id }))
		.filter(
			(profile) =>
				profile.userId !== userId && !following.includes(profile.userId)
		);
}

//updateLoggedInUserFollowing, updateFollowedUserFollowers
export async function updateLoggedInUserFollowing(
	loggedInUserDocId,
	profileId,
	isFollowingProfile
) {
	return firebaseApp
		.firestore()
		.collection("users")
		.doc(loggedInUserDocId)
		.update({
			following: isFollowingProfile
				? FieldValue.arrayRemove(profileId)
				: FieldValue.arrayUnion(profileId),
		});
}
export async function updateFollowedUserFollowers(
	profileDocId,
	userId,
	isFollowingProfile
) {
	return firebaseApp
		.firestore()
		.collection("users")
		.doc(profileDocId)
		.update({
			followers: isFollowingProfile
				? FieldValue.arrayRemove(userId)
				: FieldValue.arrayUnion(userId),
		});
}

export async function getPhotos(userId, following) {
	const result = await firebaseApp
		.firestore()
		.collection("photos")
		.where("userId", "in", following)
		.get();

	const userFollowedPhotos = result.docs.map((photo) => ({
		...photo.data(),
		docId: photo.id,
	}));

	const photosWithUserDetails = await Promise.all(
		userFollowedPhotos.map(async (photo) => {
			let userLikedPhoto = false;
			if (photo.likes.includes(userId)) {
				userLikedPhoto = true;
			}
			const user = await getUserByUserId(photo.userId);
			const { username } = user[0];
			return { username, ...photo, userLikedPhoto };
		})
	);
	console.log(userFollowedPhotos);
	return photosWithUserDetails;
}

export async function getUserPhotosByUsername(username) {
	const [user] = await getUserByUsername(username);
	const result = await firebaseApp
		.firestore()
		.collection("photos")
		.where("userId", "==", user.userId)
		.get();
	return result.docs.map((item) => ({
		...item.data(),
		docId: item.id,
	}));
}
