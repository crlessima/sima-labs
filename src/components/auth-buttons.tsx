"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export function AuthButtons() {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  async function login() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.reload();
  }

  if (loading)
    return <div className="text-xs text-muted-foreground">Carregando...</div>;

  return (
    <div className="flex items-center gap-3">
      {!user ? (
        <Button variant="outline" onClick={login}>
          Entrar com Google
        </Button>
      ) : (
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground hidden sm:inline">
            {user.email}
          </span>
          <Button variant="ghost" size="sm" onClick={logout}>
            Sair
          </Button>
        </div>
      )}
    </div>
  );
}
