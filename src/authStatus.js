let authStatus = {isLoggedIn: false, userData: null}

import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    authStatus = {
      isLoggedIn: true,
      userData: user
    };
  }
});

export { authStatus };
