import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-kPD7Myyi.js";
import { c as createLucideIcon, d as useAuthStore, L as LoaderCircle, D as Dumbbell, B as Button, a as Link } from "./router-Du8WslyJ.js";
import { C as Card, d as CardContent, a as CardHeader, b as CardTitle } from "./card-DMtbYykB.js";
import { u as useWorkoutStore, P as Plus } from "./workoutStore-DU6AXq2Y.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./workouts-q-RHBFQP.js";
const __iconNode = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode);
function HomePage() {
  const user = useAuthStore((s) => s.user);
  const {
    workouts,
    loading,
    fetchWorkouts
  } = useWorkoutStore();
  reactExports.useEffect(() => {
    if (user) fetchWorkouts(user.uid);
  }, [user, fetchWorkouts]);
  if (!user) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-3xl px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Meus treinos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        workouts.length,
        " treino",
        workouts.length === 1 ? "" : "s"
      ] })
    ] }) }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground" }) }) : workouts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col items-center gap-3 py-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Dumbbell, { className: "h-10 w-10 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Nenhum treino ainda" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/workouts/new", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        "Criar primeiro treino"
      ] }) })
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3", children: workouts.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/workouts/$workoutId", params: {
      workoutId: w.id
    }, className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "transition-colors hover:bg-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: w.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          w.exercises.length,
          " exercício",
          w.exercises.length === 1 ? "" : "s"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-5 w-5 text-muted-foreground" }) })
    ] }) }) }, w.id)) })
  ] });
}
export {
  HomePage as component
};
