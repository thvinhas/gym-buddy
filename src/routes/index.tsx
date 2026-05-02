import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/authStore";
import { useWorkoutStore } from "@/store/workoutStore";
import { Plus, Dumbbell, Loader2, ChevronRight, Settings } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
  const user = useAuthStore((s) => s.user);
  const { workouts, loading, fetchWorkouts } = useWorkoutStore();

  useEffect(() => {
    if (user) fetchWorkouts(user.uid);
  }, [user, fetchWorkouts]);

  if (!user) return null;

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Meus treinos</h1>
          <p className="text-sm text-muted-foreground">
            {workouts.length} treino{workouts.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : workouts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
            <Dumbbell className="h-10 w-10 text-muted-foreground" />
            <p className="text-muted-foreground">Nenhum treino ainda</p>
            <Button asChild>
              <Link to="/workouts/new">
                <Plus className="h-4 w-4" />
                Criar primeiro treino
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {workouts.map((w) => (
            <Link
              key={w.id}
              to="/workouts/$workoutId"
              params={{ workoutId: w.id }}
              className="block"
            >
              <Card className="transition-colors hover:bg-accent">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 py-4">
                  <div>
                    <CardTitle className="text-lg">{w.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {w.exercises.length} exercício{w.exercises.length === 1 ? "" : "s"}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
