import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [clickTimer, setClickTimer] = useState(null);

  // Check for existing session
  useEffect(() => {
    const session = sessionStorage.getItem('admin_session');
    if (session === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const handleLogoClick = () => {
    // Clear previous timer
    if (clickTimer) {
      clearTimeout(clickTimer);
    }

    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);

    if (newCount >= 5) {
      setLogoClickCount(0);
      if (!isAdmin) {
        setShowLoginModal(true);
      } else {
        logout(); // If already admin, clicking 5 times logs out
      }
      return;
    }

    // Reset count after 2 seconds of inactivity
    const timer = setTimeout(() => {
      setLogoClickCount(0);
    }, 2000);
    setClickTimer(timer);
  };

  const login = (email, password) => {
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'glenrykian@gmail.com';
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || '@Glenryk0000';

    if (email.trim() === adminEmail && password === adminPassword) {
      setIsAdmin(true);
      sessionStorage.setItem('admin_session', 'true');
      setShowLoginModal(false);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('admin_session');
  };

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        showLoginModal,
        setShowLoginModal,
        handleLogoClick,
        logoClickCount,
        login,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
