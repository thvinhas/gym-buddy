import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { signOut } from "@/services/auth";
import { Dumbbell, LogOut } from "lucide-react";

export function AppHeader() {
  const user = useAuthStore((s) => s.user);
  if (!user) return null;
  return (
    <header className="border-b bg-card">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Dumbbell className="h-5 w-5 text-primary" />
          FitTracker
        </Link>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-muted-foreground sm:inline">
            {user.email}
          </span>
          <Button variant="ghost" size="sm" onClick={() => signOut()}>
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
      </div>
    </header>
  );
}
