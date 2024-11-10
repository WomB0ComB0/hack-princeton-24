'use client';

import type { FirebaseError } from 'firebase/app';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  type User,
  type UserCredential,
  getAuth,
  signInAnonymously,
  signInWithPopup,
} from 'firebase/auth';
import { Provider, atom, useAtomValue } from 'jotai';
import { atomEffect } from 'jotai-effect';
import { loadable } from 'jotai/utils';
import React, { createContext, useContext, type ReactNode } from 'react';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { app } from './firebase';

export const currentUserValue = atom<User | null | undefined>(undefined);

export const currentUserListener = atomEffect((_get, set) => {
  return getAuth(app).onAuthStateChanged((user) => {
    set(currentUserValue, user);
  });
});

export const currentUserAsync = atom(async (get) => {
  get(currentUserListener);
  const user = get(currentUserValue);

  if (user === undefined) {
    const auth = getAuth(app);
    await auth.authStateReady();
    return auth.currentUser;
  }
  return user;
});

export const currentUserLoadable = loadable(currentUserAsync);

export function useCurrentUser() {
  return useAtomValue(currentUserAsync);
}

export function useCurrentUserLoadable() {
  return useAtomValue(currentUserLoadable);
}

export type SignInMethod = 'google.com' | 'anonymous';
export const signout: SignOutMethod = 'Sign out';
type SignOutMethod = 'Sign out';

type AuthContextType = {
  currentUser: User | null | undefined;
  useSignIn: (signInMethod: SignInMethod) => [() => void, boolean];
  useSignOut: () => [() => void, boolean];
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const currentUser = useCurrentUser();

  const useSignIn = (signInMethod: SignInMethod): [signIn: () => void, inFlight: boolean] => {
    const [inFlight, setInFlight] = useState(false);

    const signIn = useCallback(() => {
      let p: Promise<UserCredential> | null = null;

      if (signInMethod === 'anonymous') {
        const auth = getAuth(app);
        p = signInAnonymously(auth);
      }

      if (signInMethod === 'google.com') {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        provider.setCustomParameters({
          prompt: 'consent',
        });
        p = signInWithPopup(auth, provider);
      }

      if (!p) throw new Error(`Not supported: ${signInMethod}`);

      setInFlight(true);
      p.then(() => {
        window.location.reload();
        toast.success('Logged in successfully! 🎉');
      })
        .catch((error: FirebaseError) => {
          console.error('Sign-in error:', error);
          let errorMessage = 'An error occurred during sign-in. Please try again.';
          if (error.code === 'auth/network-request-failed') {
            errorMessage = 'Network error. Please check your internet connection and try again.';
          }
          toast.error(errorMessage);
        })
        .finally(() => setInFlight(false));
    }, [signInMethod]);

    return [signIn, inFlight] as const;
  };

  const useSignOut = (): [signOut: () => void, inFlight: boolean] => {
    const [inFlight, setInFlight] = useState(false);

    const signOut = useCallback(() => {
      const auth = getAuth(app);
      setInFlight(true);
      auth
        .signOut()
        .then(() => {
          window.location.reload();
          toast.success('Signed out successfully! 🎉');
        })
        .finally(() => setInFlight(false));
    }, []);

    return [signOut, inFlight] as const;
  };

  return (
    <AuthContext.Provider value={{ currentUser, useSignIn, useSignOut }}>
      <Provider>{children}</Provider>
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
