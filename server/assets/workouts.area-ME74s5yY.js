import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-BcyQEcY8.js";
import { c as createLucideIcon, d as useAuthStore, u as useNavigate, B as Button, L as LoaderCircle, t as toast } from "./router-XCAobyFt.js";
import { I as Input } from "./input-ClzkW5yJ.js";
import { L as Label } from "./label-CZrOwZFH.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./card-BhVZTf3b.js";
import { u as useWorkoutStore, P as Plus } from "./workoutStore-BxjjF6Vq.js";
import { A as ArrowLeft } from "./arrow-left-ZyT_SFuZ.js";
import { T as Trash2 } from "./trash-2-CMPg46KN.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./workouts-BIhoviBK.js";
const __iconNode = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode);
const uid = () => Math.random().toString(36).slice(2, 10);
function WorkoutAreaPage() {
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();
  const { workouts, loading, fetchWorkouts, createWorkout, updateWorkout, deleteWorkout } = useWorkoutStore();
  const [editingId, setEditingId] = reactExports.useState(null);
  const [editName, setEditName] = reactExports.useState("");
  const [editExercises, setEditExercises] = reactExports.useState([]);
  const [savingWorkout, setSavingWorkout] = reactExports.useState(false);
  const [creatingNew, setCreatingNew] = reactExports.useState(false);
  const [newName, setNewName] = reactExports.useState("");
  const [newExercises, setNewExercises] = reactExports.useState([
    { id: uid(), name: "", sets: 3, reps: 10, equipment: "" }
  ]);
  const [savingNew, setSavingNew] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (user) fetchWorkouts(user.uid);
  }, [user, fetchWorkouts]);
  if (!user) return null;
  const updateNewExercise = (id, patch) => setNewExercises((arr) => arr.map((e) => e.id === id ? { ...e, ...patch } : e));
  const addNewExercise = () => setNewExercises((arr) => [...arr, { id: uid(), name: "", sets: 3, reps: 10, equipment: "" }]);
  const removeNewExercise = (id) => setNewExercises((arr) => arr.filter((e) => e.id !== id));
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
          history: []
        }))
      });
      toast.success("Treino criado!");
      setCreatingNew(false);
      setNewName("");
      setNewExercises([{ id: uid(), name: "", sets: 3, reps: 10, equipment: "" }]);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSavingNew(false);
    }
  };
  const startEdit = (workout) => {
    setEditingId(workout.id);
    setEditName(workout.name);
    setEditExercises(
      workout.exercises.map((ex) => ({
        id: ex.id,
        name: ex.name,
        sets: ex.sets,
        reps: ex.reps,
        equipment: ex.equipment ?? ""
      }))
    );
  };
  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditExercises([]);
  };
  const updateEditExercise = (id, patch) => setEditExercises((arr) => arr.map((ex) => ex.id === id ? { ...ex, ...patch } : ex));
  const addEditExercise = () => setEditExercises((arr) => [...arr, { id: uid(), name: "", sets: 3, reps: 10, equipment: "" }]);
  const removeEditExercise = (id) => setEditExercises((arr) => arr.filter((ex) => ex.id !== id));
  const handleSaveWorkout = async (workoutId) => {
    if (!editName.trim()) return toast.error("Dê um nome ao treino");
    const validExercises = editExercises.filter((ex) => ex.name.trim());
    if (validExercises.length === 0) return toast.error("Adicione ao menos um exercício");
    setSavingWorkout(true);
    try {
      const existingWorkout = workouts.find((w) => w.id === workoutId);
      const exercises = validExercises.map((ex) => {
        const existing = existingWorkout?.exercises.find((item) => item.id === ex.id);
        return {
          id: ex.id,
          name: ex.name.trim(),
          sets: Number(ex.sets) || 0,
          reps: Number(ex.reps) || 0,
          equipment: ex.equipment?.trim() ?? "",
          history: existing?.history ?? []
        };
      });
      await updateWorkout(user.uid, workoutId, {
        name: editName.trim(),
        exercises
      });
      toast.success("Treino atualizado!");
      cancelEdit();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSavingWorkout(false);
    }
  };
  const handleDeleteWorkout = async (workoutId) => {
    if (!confirm("Excluir este treino?")) return;
    try {
      await deleteWorkout(user.uid, workoutId);
      toast.success("Treino excluído");
    } catch (err) {
      toast.error(err.message);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-4xl px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: () => navigate({ to: "/" }), className: "mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      "Voltar"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-8 text-3xl font-bold", children: "Área de Treino" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg border border-input bg-card p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold", children: "Criar novo treino" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Adicione um novo treino à sua rotina" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: creatingNew ? "secondary" : "outline",
            onClick: () => setCreatingNew((open) => !open),
            children: creatingNew ? "Cancelar" : "Novo treino"
          }
        )
      ] }),
      creatingNew && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Novo Treino" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "new-name", children: "Nome do treino" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "new-name",
                value: newName,
                onChange: (e) => setNewName(e.target.value),
                placeholder: "Ex: Push, Pull, Legs"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Exercícios" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", size: "sm", onClick: addNewExercise, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
                "Adicionar"
              ] })
            ] }),
            newExercises.map((ex, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3 pt-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
                    "Exercício ",
                    index + 1
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: ex.name,
                      onChange: (e) => updateNewExercise(ex.id, { name: e.target.value }),
                      placeholder: "Ex: Supino reto"
                    }
                  )
                ] }),
                newExercises.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "icon",
                    onClick: () => removeNewExercise(ex.id),
                    className: "mt-7",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-muted-foreground" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Aparelho / DB" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: ex.equipment ?? "",
                      onChange: (e) => updateNewExercise(ex.id, { equipment: e.target.value }),
                      placeholder: "Ex: 12 ou DB"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Séries" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "number",
                        min: 1,
                        value: ex.sets,
                        onChange: (e) => updateNewExercise(ex.id, { sets: Number(e.target.value) })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Repetições" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "number",
                        min: 1,
                        value: ex.reps,
                        onChange: (e) => updateNewExercise(ex.id, { reps: Number(e.target.value) })
                      }
                    )
                  ] })
                ] })
              ] })
            ] }) }, ex.id))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleCreateWorkout, disabled: savingNew, className: "w-full", children: [
            savingNew && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
            "Criar treino"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold", children: "Meus Treinos" }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground" }) }) : workouts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "flex flex-col items-center gap-3 py-12 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Nenhum treino ainda" }) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4", children: workouts.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: editingId === w.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { children: [
          "Editando: ",
          w.name
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `edit-name-${w.id}`, children: "Nome do treino" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: `edit-name-${w.id}`,
                value: editName,
                onChange: (e) => setEditName(e.target.value),
                placeholder: "Ex: Push, Pull, Legs"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Exercícios" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "sm",
                  onClick: addEditExercise,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
                    "Adicionar"
                  ]
                }
              )
            ] }),
            editExercises.map((ex, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3 pt-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
                    "Exercício ",
                    index + 1
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: ex.name,
                      onChange: (e) => updateEditExercise(ex.id, { name: e.target.value }),
                      placeholder: "Ex: Supino reto"
                    }
                  )
                ] }),
                editExercises.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "icon",
                    onClick: () => removeEditExercise(ex.id),
                    className: "mt-7",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-muted-foreground" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Aparelho / DB" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: ex.equipment ?? "",
                      onChange: (e) => updateEditExercise(ex.id, { equipment: e.target.value }),
                      placeholder: "Ex: 12 ou DB"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Séries" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "number",
                        min: 1,
                        value: ex.sets,
                        onChange: (e) => updateEditExercise(ex.id, { sets: Number(e.target.value) })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Repetições" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "number",
                        min: 1,
                        value: ex.reps,
                        onChange: (e) => updateEditExercise(ex.id, { reps: Number(e.target.value) })
                      }
                    )
                  ] })
                ] })
              ] })
            ] }) }, ex.id))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: cancelEdit, disabled: savingWorkout, children: "Cancelar" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => handleSaveWorkout(w.id), disabled: savingWorkout, children: [
              savingWorkout && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
              "Salvar"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "destructive",
                onClick: () => {
                  handleDeleteWorkout(w.id);
                  cancelEdit();
                },
                disabled: savingWorkout,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }),
                  "Excluir"
                ]
              }
            )
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: w.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            w.exercises.length,
            " exercício",
            w.exercises.length === 1 ? "" : "s"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "icon",
            onClick: () => startEdit(w),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-4 w-4" })
          }
        ) })
      ] }) }) }, w.id)) })
    ] })
  ] });
}
const SplitComponent = WorkoutAreaPage;
export {
  SplitComponent as component
};
