import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId) => {
    try {
      if (!userId) {
        setProfile(null);
        return;
      }
      const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
      setProfile(data || null);
    } catch (e) {
      console.error('Failed to fetch profile:', e);
      setProfile(null);
    }
  };

  useEffect(() => {
    // Check active session on initial load
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        fetchProfile(currentUser.id).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        await fetchProfile(currentUser.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const saveProfile = async (role, nickname) => {
    if (!user) return { error: new Error('Not logged in') };
    const { data, error } = await supabase.from('profiles').insert({
      id: user.id,
      role,
      nickname
    }).select().single();
    
    if (!error && data) {
      setProfile(data);
    }
    return { data, error };
  };

  const signUp = async (email, password) => {
    return supabase.auth.signUp({ email, password });
  };

  const signIn = async (email, password) => {
    return supabase.auth.signInWithPassword({ email, password });
  };

  const signInWithGoogle = async () => {
    return supabase.auth.signInWithOAuth({ provider: 'google' });
  };

  const signInWithKakao = async () => {
    return supabase.auth.signInWithOAuth({ provider: 'kakao' });
  };

  const signOut = async () => {
    return supabase.auth.signOut();
  };

  const SUPER_ADMIN_EMAILS = ['jeje09@nate.com', 'jeje09@daum.net'];
  const isSuperAdmin = user && SUPER_ADMIN_EMAILS.includes(user?.email);

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      loading,
      isSuperAdmin,
      saveProfile,
      signUp,
      signIn,
      signInWithGoogle,
      signInWithKakao,
      signOut
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
