import React from 'react';
import { useAtomValue } from 'jotai';
import { isAuthenticatedAtom } from '../atoms/userAtoms';
import LoginPage from '../pages/LoginPage';

interface AuthProviderProps {
	children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const isAuthenticated = useAtomValue(isAuthenticatedAtom);

	// If not authenticated, show login page regardless of route
	if (!isAuthenticated) {
		return <LoginPage />;
	}

	// If authenticated, render the children (protected routes)
	return <>{children}</>;
};

export default AuthProvider;
