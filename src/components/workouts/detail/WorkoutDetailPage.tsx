import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useWorkoutStore } from "@/store/workoutStore";
import { getWorkout, saveExerciseWeight, type Workout } from "@/services/workouts";
import { ArrowLeft, Loader2 } from "lucide-react";
import { WorkoutView } from "@/components/workouts/detail/WorkoutView";
import { toast } from "sonner";

export function WorkoutDetailPage({ workoutId }: { workoutId: string }) {
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [weights, setWeights] = useState<Record<string, string>>({});
  const [savingId, setSavingId] = useState<string | null>(null);
  const [inSession, setInSession] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [savingSession, setSavingSession] = useState(false);

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

  const handleFinishWorkout = async () => {
    if (!user || !workout) return;

    const completedIds = Array.from(completedExercises);
    const exercisesWithWeights = completedIds.filter((exId) => weights[exId]?.trim());
    if (exercisesWithWeights.length === 0) {
      toast.error("Informe pelo menos um peso para finalizar");
      return;
    }

    setSavingSession(true);
    try {
      for (const exId of exercisesWithWeights) {
        const value = Number(weights[exId]);
        if (!isNaN(value) && value > 0) {
          await saveExerciseWeight(user.uid, workout.id, exId, value);
        }
      }

      const updated = await getWorkout(user.uid, workout.id);
      setWorkout(updated);
      setWeights({});
      setCompletedExercises(new Set());
      setInSession(false);
      toast.success("Treino finalizado! Pesos salvos.");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSavingSession(false);
    }
  };

  const toggleExerciseComplete = (exerciseId: string) => {
    setCompletedExercises((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(exerciseId)) {
        newSet.delete(exerciseId);
      } else {
        newSet.add(exerciseId);
      }
      return newSet;
    });
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

      <div className="mb-6 flex flex-col gap-3">
        {!inSession ? (
          <Button onClick={() => setInSession(true)} size="lg" className="w-full">
            Começar Treino
          </Button>
        ) : (
          <>
            <Button
              onClick={handleFinishWorkout}
              disabled={savingSession || completedExercises.size === 0}
              size="lg"
              className="w-full"
            >
              {savingSession ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Finalizando...
                </>
              ) : (
                `Finalizar Treino (${completedExercises.size}/${workout.exercises.length})`
              )}
            </Button>
            <Button
              onClick={() => {
                setInSession(false);
                setCompletedExercises(new Set());
              }}
              variant="outline"
              size="lg"
              className="w-full"
              disabled={savingSession}
            >
              Cancelar Treino
            </Button>
          </>
        )}
      </div>
      <WorkoutView
        workout={workout}
        weights={weights}
        savingId={savingId}
        inSession={inSession}
        completedExercises={completedExercises}
        onWeightChange={(exerciseId, value) => setWeights((s) => ({ ...s, [exerciseId]: value }))}
        onSave={handleSave}
        onToggleExercise={toggleExerciseComplete}
      />
    </main>
  );
}
