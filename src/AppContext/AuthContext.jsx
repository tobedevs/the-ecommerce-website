import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { 
    onAuthStateChanged, 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword, 
    signOut,
    updateProfile
} from 'firebase/auth';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfileName, setUserProfileName] = useState(""); 
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. Sign Up function 
  async function signup(email, password, username) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: username
      });

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        username: username,
        role: "user"
      });

      await user.reload();
      
      setUserProfileName(username);
      
      return userCredential;
    } catch (error) {
      console.error("Signup failed: ", error.message);
      if (error.message && error.message.indexOf('email-already-in-use') !== -1) {
        toast.error("This email is already registered");
      } else { 
        toast.error("Something went wrong when signing up: " + error.message);
      }
      throw error; 
    }
  }

  // 2. Login function 
  async function login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential; 
    } catch (error) {
      console.error("Login failed: ", error.message);
      toast.error("Login failed: " + error.message);
      throw error; 
    }
  }

  // 3. Logout function
  async function logout() {
    await signOut(auth);
    setUserProfileName("");
    setIsAdmin(false);
  }

  // 4. Track User State & Fetch Profile Info Dynamically
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          // Fetch the document from Firestore to get the actual database values
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUserProfileName(userData.username || user.displayName || "User");
            setIsAdmin(userData.role === 'admin');
          } else {
            // Fallback if firestore document hasn't populated yet
            setUserProfileName(user.displayName || "User");
            setIsAdmin(false);
          }
        } catch (err) {
          console.error("Error fetching user profile data:", err);
          setUserProfileName(user.displayName || "User");
        }
      } else {
        setUserProfileName("");
        setIsAdmin(false);
      }
      
      setLoading(false); 
    });

    return unsubscribe;
  }, []);

  // Use the database name first, fallback to Firebase Auth name, then fallback to email
  const username = userProfileName || currentUser?.displayName || currentUser?.email || "User";

  const value = {
    currentUser,
    username,
    login,
    signup,
    logout,
    loading,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}