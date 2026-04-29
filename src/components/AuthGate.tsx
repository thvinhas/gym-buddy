import { useEffect } from "react";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { subscribeAuth } from "@/services/auth";
import { useAuthStore } from "@/store/authStore";
import { Loader2 } from "lucide-react";

const PUBLIC = ["/login", "/signup"];

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading, setUser } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => subscribeAuth(setUser), [setUser]);

  useEffect(() => {
    if (loading) return;
    const isPublic = PUBLIC.includes(location.pathname);
    if (!user && !isPublic) navigate({ to: "/login" });
    if (user && isPublic) navigate({ to: "/" });
  }, [user, loading, location.pathname, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  return <>{children}</>;
}
