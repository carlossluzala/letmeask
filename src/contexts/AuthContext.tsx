import React, { createContext, useCallback, useEffect, useState } from 'react'

import { auth, firebase } from '../services/firebase'

type User = {
  id: string
  name: string
  avatar: string
}

type ContextData = {
  user: User | undefined
  signInWithGoogle: () => Promise<void>
}

export const AuthContext = createContext({} as ContextData)

type AuthProviderProps = {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()

  function setValidUser(user: firebase.User | null) {
    if (user) {
      const { displayName, photoURL, uid } = user

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account')
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }

  const signInWithGoogle = useCallback(async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    const result = await auth.signInWithPopup(provider)

    setValidUser(result.user)
  }, [])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setValidUser(user)
    })

    return () => {
      unsubscribe()
    }
  }, [user])

  return (
    <AuthContext.Provider value={{ signInWithGoogle, user }}>
      {children}
    </AuthContext.Provider>
  )
}
