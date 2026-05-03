import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-BcyQEcY8.js";
import { d as useAuthStore, u as useNavigate, B as Button, L as LoaderCircle, t as toast } from "./router-XCAobyFt.js";
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
const uid = () => Math.random().toString(36).slice(2, 10);
function WorkoutNewPage() {
  const user = useAuthStore((s) => s.user);
  const createWorkout = useWorkoutStore((s) => s.createWorkout);
  const navigate = useNavigate();
  const [name, setName] = reactExports.useState("");
  const [exercises, setExercises] = reactExports.useState([
    { id: uid(), name: "", sets: 3, reps: 10, equipment: "" }
  ]);
  const [saving, setSaving] = reactExports.useState(false);
  const updateEx = (id, patch) => setExercises((arr) => arr.map((e) => e.id === id ? { ...e, ...patch } : e));
  const addEx = () => setExercises((arr) => [...arr, { id: uid(), name: "", sets: 3, reps: 10, equipment: "" }]);
  const removeEx = (id) => setExercises((arr) => arr.filter((e) => e.id !== id));
  const onSubmit = async (e) => {
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
          equipment: ex.equipment?.trim() ?? "",
          history: []
        }))
      });
      toast.success("Treino criado!");
      navigate({ to: "/" });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-3xl px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: () => navigate({ to: "/" }), className: "mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      "Voltar"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-6 text-2xl font-bold", children: "Novo treino" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Informações" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: "Nome do treino" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "name",
              value: name,
              onChange: (e) => setName(e.target.value),
              placeholder: "Ex: Push, Pull, Legs",
              required: true
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold", children: "Exercícios" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", size: "sm", onClick: addEx, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
            "Adicionar"
          ] })
        ] }),
        exercises.map((ex, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3 pt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
                "Exercício ",
                i + 1
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: ex.name,
                  onChange: (e) => updateEx(ex.id, { name: e.target.value }),
                  placeholder: "Ex: Supino reto"
                }
              )
            ] }),
            exercises.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "icon",
                onClick: () => removeEx(ex.id),
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
                  onChange: (e) => updateEx(ex.id, { equipment: e.target.value }),
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
                    onChange: (e) => updateEx(ex.id, { sets: Number(e.target.value) })
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
                    onChange: (e) => updateEx(ex.id, { reps: Number(e.target.value) })
                  }
                )
              ] })
            ] })
          ] })
        ] }) }, ex.id))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", className: "w-full", disabled: saving, children: [
        saving && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
        "Salvar treino"
      ] })
    ] })
  ] });
}
const SplitComponent = WorkoutNewPage;
export {
  SplitComponent as component
};
