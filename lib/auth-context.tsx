'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from './supabase'
import { User, Session } from '@supabase/supabase-js'

type AuthContextType = {
  user: User | null
  session: Session | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function initAuth() {
      // Check active sessions and sets the user
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Error getting session:', sessionError);
        setLoading(false);
        return;
      }
      
      const currentSession = sessionData.session;
      console.log('Initial auth state:', {
        hasSession: !!currentSession,
        user: currentSession?.user ? {
          id: currentSession.user.id,
          email: currentSession.user.email,
          role: currentSession.user.role
        } : null
      });
      
      setUser(currentSession?.user ?? null);
      setSession(currentSession);
      setLoading(false);
      
      // Test database access
      if (currentSession?.user) {
        const { data: testData, error: testError } = await supabase
          .from('User')
          .select('id, email')
          .eq('id', currentSession.user.id)
          .single();
          
        console.log('Database access test:', {
          success: !testError,
          error: testError,
          userData: testData
        });
      }
    }

    initAuth();

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      console.log('Auth state changed:', {
        event: _event,
        hasSession: !!newSession,
        userId: newSession?.user?.id
      });
      
      setUser(newSession?.user ?? null);
      setSession(newSession);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [])

  return (
    <AuthContext.Provider value={{ user, session, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
