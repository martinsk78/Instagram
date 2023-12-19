import { React, useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { getUserByUserId, getPhotos } from "../services/firebase";
export default function usePhotos() {
    const [photos, setPhotos] = useState(null);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user && user.uid) { // Check if user and user.uid are available
            const { uid: userId } = user;
            async function getTimelinePhotos() {
                const [{ following }] = await getUserByUserId(userId);
                let followedUserPhotos = [];
                console.log("following", following);
                if (following && following.length > 0) {
                    followedUserPhotos = await getPhotos(userId, following);
                }

                followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
                setPhotos(followedUserPhotos);
            }
            getTimelinePhotos();
        }
    }, [user]);

    return { photos };
}

