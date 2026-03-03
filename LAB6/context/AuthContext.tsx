import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConnected } from '../lib/supabaseClient';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Safety check: If using dummy client, stop loading immediately
    if (!isSupabaseConnected) {
      console.log('Supabase not connected yet.');
      setIsLoading(false);
      return;
    }

    // 1. Check active session on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(mapSupabaseUser(session.user));
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    // 2. Listen for changes (login, logout, token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(mapSupabaseUser(session.user));
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Helper to map Supabase auth user to our App User type
  const mapSupabaseUser = (sbUser: any): User => {
    const email = sbUser.email || '';
    // Simple Admin Logic: Check against a hardcoded email
    // In a production app, you might use a 'profiles' table or user_metadata['role']
    const role = email === 'admin@fitforge.com' ? 'admin' : 'user';
    
    return {
      id: sbUser.id,
      name: sbUser.user_metadata?.full_name || email.split('@')[0],
      email: email,
      role: role,
    };
  };

  const login = async (email: string, password: string) => {
    if (!isSupabaseConnected) {
        throw new Error('Please configure Supabase credentials in lib/supabaseClient.ts');
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signup = async (name: string, email: string, password: string) => {
    if (!isSupabaseConnected) {
        throw new Error('Please configure Supabase credentials in lib/supabaseClient.ts');
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });
    if (error) throw error;
  };

  const logout = async () => {
    if (isSupabaseConnected) {
        await supabase.auth.signOut();
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
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
