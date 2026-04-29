import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/authStore";
import { useWorkoutStore } from "@/store/workoutStore";
import type { Exercise } from "@/services/workouts";
import { Plus, Trash2, Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/workouts/new")({ component: NewWorkoutPage });

type Draft = Omit<Exercise, "id" | "history"> & { id: string };

const uid = () => Math.random().toString(36).slice(2, 10);

function NewWorkoutPage() {
  const user = useAuthStore((s) => s.user);
  const createWorkout = useWorkoutStore((s) => s.createWorkout);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [exercises, setExercises] = useState<Draft[]>([
    { id: uid(), name: "", sets: 3, reps: 10 },
  ]);
  const [saving, setSaving] = useState(false);

  const updateEx = (id: string, patch: Partial<Draft>) =>
    setExercises((arr) => arr.map((e) => (e.id === id ? { ...e, ...patch } : e)));

  const addEx = () =>
    setExercises((arr) => [...arr, { id: uid(), name: "", sets: 3, reps: 10 }]);

  const removeEx = (id: string) =>
    setExercises((arr) => arr.filter((e) => e.id !== id));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!name.trim()) return toast.error("Dê um nome ao treino");
    const valid = exercises.filter((ex) => ex.name.trim());
    if (valid.length === 0) return toast.error("Adicione ao menos um exercício");

    setSaving(true);
    try {
      await createWorkout(user.uid, {
        name: name.trim(),
        exercises: valid.map((ex) => ({
          id: ex.id,
          name: ex.name.trim(),
          sets: Number(ex.sets) || 0,
          reps: Number(ex.reps) || 0,
          history: [],
        })),
      });
      toast.success("Treino criado!");
      navigate({ to: "/" });
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <Button variant="ghost" size="sm" onClick={() => navigate({ to: "/" })} className="mb-4">
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </Button>
      <h1 className="mb-6 text-2xl font-bold">Novo treino</h1>

      <form onSubmit={onSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Informações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="name">Nome do treino</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Push, Pull, Legs"
                required
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Exercícios</h2>
            <Button type="button" variant="outline" size="sm" onClick={addEx}>
              <Plus className="h-4 w-4" />
              Adicionar
            </Button>
          </div>

          {exercises.map((ex, i) => (
            <Card key={ex.id}>
              <CardContent className="space-y-3 pt-6">
                <div className="flex items-start gap-2">
                  <div className="flex-1 space-y-2">
                    <Label>Exercício {i + 1}</Label>
                    <Input
                      value={ex.name}
                      onChange={(e) => updateEx(ex.id, { name: e.target.value })}
                      placeholder="Ex: Supino reto"
                    />
                  </div>
                  {exercises.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeEx(ex.id)}
                      className="mt-7"
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Séries</Label>
                    <Input
                      type="number"
                      min={1}
                      value={ex.sets}
                      onChange={(e) => updateEx(ex.id, { sets: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Repetições</Label>
                    <Input
                      type="number"
                      min={1}
                      value={ex.reps}
                      onChange={(e) => updateEx(ex.id, { reps: Number(e.target.value) })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button type="submit" className="w-full" disabled={saving}>
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          Salvar treino
        </Button>
      </form>
    </main>
  );
}
