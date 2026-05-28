import React, { createContext, useContext, useState } from 'react';

const SignUpDrawerContext = createContext(null);

export function SignUpDrawerProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SignUpDrawerContext.Provider
      value={{
        isOpen,
        openDrawer: () => setIsOpen(true),
        closeDrawer: () => setIsOpen(false),
      }}
    >
      {children}
    </SignUpDrawerContext.Provider>
  );
}

export function useSignUpDrawer() {
  return useContext(SignUpDrawerContext);
}
