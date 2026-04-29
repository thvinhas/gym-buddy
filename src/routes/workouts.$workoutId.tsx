import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/authStore";
import { getWorkout, saveExerciseWeight, type Workout } from "@/services/workouts";
import { ArrowLeft, Loader2, TrendingUp } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/workouts/$workoutId")({
  component: WorkoutDetailPage,
});

function WorkoutDetailPage() {
  const { workoutId } = Route.useParams();
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [weights, setWeights] = useState<Record<string, string>>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const w = await getWorkout(user.uid, workoutId);
        setWorkout(w);
      } catch (err) {
        toast.error((err as Error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, [user, workoutId]);

  const handleSave = async (exerciseId: string) => {
    if (!user || !workout) return;
    const raw = weights[exerciseId];
    const value = Number(raw);
    if (!raw || isNaN(value) || value <= 0) {
      toast.error("Informe um peso válido");
      return;
    }
    setSavingId(exerciseId);
    try {
      const updated = await saveExerciseWeight(user.uid, workout.id, exerciseId, value);
      setWorkout(updated);
      setWeights((s) => ({ ...s, [exerciseId]: "" }));
      toast.success("Peso salvo!");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSavingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (!workout) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8">
        <p className="text-muted-foreground">Treino não encontrado.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <Button variant="ghost" size="sm" onClick={() => navigate({ to: "/" })} className="mb-4">
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </Button>
      <h1 className="mb-6 text-2xl font-bold">{workout.name}</h1>

      <div className="space-y-3">
        {workout.exercises.map((ex) => {
          const last = ex.history?.[ex.history.length - 1];
          return (
            <Card key={ex.id}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{ex.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {ex.sets} séries × {ex.reps} reps
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    type="number"
                    inputMode="decimal"
                    placeholder="Peso (kg)"
                    value={weights[ex.id] ?? ""}
                    onChange={(e) =>
                      setWeights((s) => ({ ...s, [ex.id]: e.target.value }))
                    }
                  />
                  <Button
                    onClick={() => handleSave(ex.id)}
                    disabled={savingId === ex.id}
                  >
                    {savingId === ex.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Salvar"
                    )}
                  </Button>
                </div>
                {last && (
                  <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Último peso:</span>
                    <span className="font-medium">{last.weight} kg</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {new Date(last.date).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
