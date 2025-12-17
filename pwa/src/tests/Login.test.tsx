import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Login from '../pages/Login';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';

// Mock the API and other hooks if necessary
// For this simple test, we just check if the login form renders

describe('Login Page', () => {
    it('renders the login form', () => {
        render(
            <AuthProvider>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </AuthProvider>
        );
        expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    });
});
