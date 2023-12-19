import { useState, useEffect, useContext } from "react";

import FirebaseContext from "../context/firebase";

export default function useAuthListener() {
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("authUser"))
	);
	const { firebaseApp } = useContext(FirebaseContext);

	useEffect(() => {
		const listener = firebaseApp.auth().onAuthStateChanged((authUser) => {
			// we have a user ... therefore we can store the user in localstorage
			if (authUser) {
                localStorage.setItem('authUser', JSON.stringify(authUser));
                setUser(authUser)
			}else { 
                //we dont have an authUser, therefore clear the localStorage
                localStorage.removeItem('authUser');
                setUser(null);
            }
		});

        return ()=> listener()

	}, [firebaseApp]);

	return { user };
}
