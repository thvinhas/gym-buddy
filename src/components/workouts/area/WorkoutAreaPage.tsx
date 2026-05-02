import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/authStore";
import { useWorkoutStore } from "@/store/workoutStore";
import type { Exercise, Workout } from "@/services/workouts";
import { Plus, Trash2, Loader2, ArrowLeft, Edit2 } from "lucide-react";
import { toast } from "sonner";

type DraftExercise = Omit<Exercise, "history">;
type DraftWorkout = Omit<Exercise, "id" | "history"> & { id: string };

const uid = () => Math.random().toString(36).slice(2, 10);

export function WorkoutAreaPage() {
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();
  const { workouts, loading, fetchWorkouts, createWorkout, updateWorkout, deleteWorkout } =
    useWorkoutStore();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editExercises, setEditExercises] = useState<DraftExercise[]>([]);
  const [savingWorkout, setSavingWorkout] = useState(false);

  const [creatingNew, setCreatingNew] = useState(false);
  const [newName, setNewName] = useState("");
  const [newExercises, setNewExercises] = useState<DraftWorkout[]>([
    { id: uid(), name: "", sets: 3, reps: 10, equipment: "" },
  ]);
  const [savingNew, setSavingNew] = useState(false);

  useEffect(() => {
    if (user) fetchWorkouts(user.uid);
  }, [user, fetchWorkouts]);

  if (!user) return null;

  const updateNewExercise = (id: string, patch: Partial<DraftWorkout>) =>
    setNewExercises((arr) => arr.map((e) => (e.id === id ? { ...e, ...patch } : e)));

  const addNewExercise = () =>
    setNewExercises((arr) => [...arr, { id: uid(), name: "", sets: 3, reps: 10, equipment: "" }]);

  const removeNewExercise = (id: string) =>
    setNewExercises((arr) => arr.filter((e) => e.id !== id));

  const handleCreateWorkout = async () => {
    if (!newName.trim()) return toast.error("Dê um nome ao treino");
    const valid = newExercises.filter((ex) => ex.name.trim());
    if (valid.length === 0) return toast.error("Adicione ao menos um exercício");

    setSavingNew(true);
    try {
      await createWorkout(user.uid, {
        name: newName.trim(),
        exercises: valid.map((ex) => ({
          id: ex.id,
          name: ex.name.trim(),
          sets: Number(ex.sets) || 0,
          reps: Number(ex.reps) || 0,
          equipment: ex.equipment?.trim() ?? "",
          history: [],
        })),
      });
      toast.success("Treino criado!");
      setCreatingNew(false);
      setNewName("");
      setNewExercises([{ id: uid(), name: "", sets: 3, reps: 10, equipment: "" }]);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSavingNew(false);
    }
  };

  const startEdit = (workout: Workout) => {
    setEditingId(workout.id);
    setEditName(workout.name);
    setEditExercises(
      workout.exercises.map((ex) => ({
        id: ex.id,
        name: ex.name,
        sets: ex.sets,
        reps: ex.reps,
        equipment: ex.equipment ?? "",
      })),
    );
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditExercises([]);
  };

  const updateEditExercise = (id: string, patch: Partial<DraftExercise>) =>
    setEditExercises((arr) => arr.map((ex) => (ex.id === id ? { ...ex, ...patch } : ex)));

  const addEditExercise = () =>
    setEditExercises((arr) => [...arr, { id: uid(), name: "", sets: 3, reps: 10, equipment: "" }]);

  const removeEditExercise = (id: string) =>
    setEditExercises((arr) => arr.filter((ex) => ex.id !== id));

  const handleSaveWorkout = async (workoutId: string) => {
    if (!editName.trim()) return toast.error("Dê um nome ao treino");

    const validExercises = editExercises.filter((ex) => ex.name.trim());
    if (validExercises.length === 0) return toast.error("Adicione ao menos um exercício");

    setSavingWorkout(true);
    try {
      const existingWorkout = workouts.find((w) => w.id === workoutId);
      const exercises: Exercise[] = validExercises.map((ex) => {
        const existing = existingWorkout?.exercises.find((item) => item.id === ex.id);
        return {
          id: ex.id,
          name: ex.name.trim(),
          sets: Number(ex.sets) || 0,
          reps: Number(ex.reps) || 0,
          equipment: ex.equipment?.trim() ?? "",
          history: existing?.history ?? [],
        };
      });

      await updateWorkout(user.uid, workoutId, {
        name: editName.trim(),
        exercises,
      });

      toast.success("Treino atualizado!");
      cancelEdit();
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSavingWorkout(false);
    }
  };

  const handleDeleteWorkout = async (workoutId: string) => {
    if (!confirm("Excluir este treino?")) return;
    try {
      await deleteWorkout(user.uid, workoutId);
      toast.success("Treino excluído");
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <Button variant="ghost" size="sm" onClick={() => navigate({ to: "/" })} className="mb-4">
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </Button>

      <h1 className="mb-8 text-3xl font-bold">Área de Treino</h1>

      <div className="mb-8 space-y-6">
        <div className="flex items-center justify-between rounded-lg border border-input bg-card p-4">
          <div>
            <h2 className="font-semibold">Criar novo treino</h2>
            <p className="text-sm text-muted-foreground">Adicione um novo treino à sua rotina</p>
          </div>
          <Button
            variant={creatingNew ? "secondary" : "outline"}
            onClick={() => setCreatingNew((open) => !open)}
          >
            {creatingNew ? "Cancelar" : "Novo treino"}
          </Button>
        </div>

        {creatingNew && (
          <Card>
            <CardHeader>
              <CardTitle>Novo Treino</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="new-name">Nome do treino</Label>
                <Input
                  id="new-name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ex: Push, Pull, Legs"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Exercícios</h3>
                  <Button type="button" variant="outline" size="sm" onClick={addNewExercise}>
                    <Plus className="h-4 w-4" />
                    Adicionar
                  </Button>
                </div>

                {newExercises.map((ex, index) => (
                  <Card key={ex.id}>
                    <CardContent className="space-y-3 pt-6">
                      <div className="flex items-start gap-2">
                        <div className="flex-1 space-y-2">
                          <Label>Exercício {index + 1}</Label>
                          <Input
                            value={ex.name}
                            onChange={(e) => updateNewExercise(ex.id, { name: e.target.value })}
                            placeholder="Ex: Supino reto"
                          />
                        </div>
                        {newExercises.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeNewExercise(ex.id)}
                            className="mt-7"
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="space-y-2">
                          <Label>Aparelho / DB</Label>
                          <Input
                            value={ex.equipment ?? ""}
                            onChange={(e) =>
                              updateNewExercise(ex.id, { equipment: e.target.value })
                            }
                            placeholder="Ex: 12 ou DB"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label>Séries</Label>
                            <Input
                              type="number"
                              min={1}
                              value={ex.sets}
                              onChange={(e) =>
                                updateNewExercise(ex.id, { sets: Number(e.target.value) })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Repetições</Label>
                            <Input
                              type="number"
                              min={1}
                              value={ex.reps}
                              onChange={(e) =>
                                updateNewExercise(ex.id, { reps: Number(e.target.value) })
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button onClick={handleCreateWorkout} disabled={savingNew} className="w-full">
                {savingNew && <Loader2 className="h-4 w-4 animate-spin" />}
                Criar treino
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Meus Treinos</h2>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : workouts.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
              <p className="text-muted-foreground">Nenhum treino ainda</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {workouts.map((w) => (
              <div key={w.id}>
                {editingId === w.id ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Editando: {w.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor={`edit-name-${w.id}`}>Nome do treino</Label>
                        <Input
                          id={`edit-name-${w.id}`}
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          placeholder="Ex: Push, Pull, Legs"
                        />
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">Exercícios</h3>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={addEditExercise}
                          >
                            <Plus className="h-4 w-4" />
                            Adicionar
                          </Button>
                        </div>

                        {editExercises.map((ex, index) => (
                          <Card key={ex.id}>
                            <CardContent className="space-y-3 pt-6">
                              <div className="flex items-start gap-2">
                                <div className="flex-1 space-y-2">
                                  <Label>Exercício {index + 1}</Label>
                                  <Input
                                    value={ex.name}
                                    onChange={(e) =>
                                      updateEditExercise(ex.id, { name: e.target.value })
                                    }
                                    placeholder="Ex: Supino reto"
                                  />
                                </div>
                                {editExercises.length > 1 && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeEditExercise(ex.id)}
                                    className="mt-7"
                                  >
                                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                                  </Button>
                                )}
                              </div>
                              <div className="grid grid-cols-1 gap-3">
                                <div className="space-y-2">
                                  <Label>Aparelho / DB</Label>
                                  <Input
                                    value={ex.equipment ?? ""}
                                    onChange={(e) =>
                                      updateEditExercise(ex.id, { equipment: e.target.value })
                                    }
                                    placeholder="Ex: 12 ou DB"
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                  <div className="space-y-2">
                                    <Label>Séries</Label>
                                    <Input
                                      type="number"
                                      min={1}
                                      value={ex.sets}
                                      onChange={(e) =>
                                        updateEditExercise(ex.id, { sets: Number(e.target.value) })
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Repetições</Label>
                                    <Input
                                      type="number"
                                      min={1}
                                      value={ex.reps}
                                      onChange={(e) =>
                                        updateEditExercise(ex.id, { reps: Number(e.target.value) })
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" onClick={cancelEdit} disabled={savingWorkout}>
                          Cancelar
                        </Button>
                        <Button onClick={() => handleSaveWorkout(w.id)} disabled={savingWorkout}>
                          {savingWorkout && <Loader2 className="h-4 w-4 animate-spin" />}
                          Salvar
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => {
                            handleDeleteWorkout(w.id);
                            cancelEdit();
                          }}
                          disabled={savingWorkout}
                        >
                          <Trash2 className="h-4 w-4" />
                          Excluir
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                      <div>
                        <CardTitle>{w.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {w.exercises.length} exercício{w.exercises.length === 1 ? "" : "s"}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => startEdit(w)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
