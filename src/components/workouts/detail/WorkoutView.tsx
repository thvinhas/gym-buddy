import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Loader2, TrendingUp } from "lucide-react";
import type { Exercise, Workout } from "@/services/workouts";

type WorkoutViewProps = {
  workout: Workout;
  weights: Record<string, string>;
  savingId: string | null;
  inSession?: boolean;
  completedExercises?: Set<string>;
  onWeightChange: (exerciseId: string, value: string) => void;
  onSave: (exerciseId: string) => void;
  onToggleExercise?: (exerciseId: string) => void;
};

export function WorkoutView({
  workout,
  weights,
  savingId,
  inSession = false,
  completedExercises = new Set(),
  onWeightChange,
  onSave,
  onToggleExercise,
}: WorkoutViewProps) {
  return (
    <div className="space-y-3">
      {workout.exercises.map((ex) => {
        const last = ex.history?.[ex.history.length - 1];
        const isCompleted = completedExercises.has(ex.id);

        return (
          <Card key={ex.id} className={isCompleted ? "bg-slate-50 text-slate-500 shadow-sm" : ""}>
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                {inSession && (
                  <Checkbox
                    id={`ex-${ex.id}`}
                    checked={isCompleted}
                    onCheckedChange={() => onToggleExercise?.(ex.id)}
                  />
                )}
                <div className="flex-1">
                  <CardTitle className={`text-lg ${isCompleted ? "text-slate-700" : ""}`}>
                    {ex.name}
                  </CardTitle>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>
                      {ex.sets} séries × {ex.reps} reps
                    </p>
                    {ex.equipment ? <p>Aparelho / DB: {ex.equipment}</p> : null}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className={`space-y-3 ${isCompleted ? "opacity-70" : ""}`}>
              {inSession ? (
                <div className="flex gap-2">
                  <Input
                    type="number"
                    inputMode="decimal"
                    placeholder="Peso (kg)"
                    value={weights[ex.id] ?? ""}
                    onChange={(e) => onWeightChange(ex.id, e.target.value)}
                    disabled={!isCompleted}
                  />
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    type="number"
                    inputMode="decimal"
                    placeholder="Peso (kg)"
                    value={weights[ex.id] ?? ""}
                    onChange={(e) => onWeightChange(ex.id, e.target.value)}
                  />
                  <Button onClick={() => onSave(ex.id)} disabled={savingId === ex.id}>
                    {savingId === ex.id ? <Loader2 className="h-4 w-4 animate-spin" /> : "Salvar"}
                  </Button>
                </div>
              )}
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
  );
}
