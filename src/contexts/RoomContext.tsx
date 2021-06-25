import React, { createContext } from 'react'

type ContextData = {}

export const RoomContext = createContext({} as ContextData)

type RoomProviderProps = {
  children: React.ReactNode
}

export function RoomProvider({ children }: RoomProviderProps) {
  return (
    <RoomContext.Provider value={{ test: 'test' }}>
      {children}
    </RoomContext.Provider>
  )
}
