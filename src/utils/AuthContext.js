import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        };

        fetchSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const login = async (email, password) => {
        setError(null);
        const { data, error: loginError } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (loginError) {
            setError(loginError.message);
            throw loginError;
        }

        return data;
    };

    const signup = async (email, password) => {
        setError(null);
        const { data, error: signupError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`
            }
        });

        if (signupError) {
            setError(signupError.message);
            throw signupError;
        }

        return data;
    };

    const logout = async () => {
        const { error: signOutError } = await supabase.auth.signOut();
        if (signOutError) {
            setError(signOutError.message);
            throw signOutError;
        }
        setUser(null);
        setSession(null);
    };

    const verifyOTP = async (email, token) => {
        setError(null);
        const { data, error: verifyError } = await supabase.auth.verifyOtp({
            email,
            token,
            type: 'signup'
        });

        if (verifyError) {
            setError(verifyError.message);
            throw verifyError;
        }

        return data;
    };

    return (
        <AuthContext.Provider value={{
            user,
            session,
            login,
            signup,
            logout,
            verifyOTP,
            error,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);