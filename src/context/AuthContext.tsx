import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  auth, 
  onAuthStateChanged, 
  signInAnonymously, 
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  db,
  doc,
  setDoc,
  serverTimestamp
} from '../firebase';
import { User } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  isAuthReady: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Update session metadata
        try {
          await setDoc(doc(db, 'sessions', currentUser.uid), {
            uid: currentUser.uid,
            lastActive: serverTimestamp(),
            isAnonymous: currentUser.isAnonymous
          }, { merge: true });
        } catch (e) {
          console.error("Error updating session:", e);
        }
      } else {
        // Automatically sign in anonymously for a secure session if not already signed in
        try {
          await signInAnonymously(auth);
        } catch (e) {
          console.error("Anonymous sign-in failed:", e);
        }
        setUser(null);
      }
      setLoading(false);
      setIsAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut, isAuthReady }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
