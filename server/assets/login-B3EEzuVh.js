import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-BcyQEcY8.js";
import { u as useNavigate, D as Dumbbell, B as Button, L as LoaderCircle, a as Link, t as toast, b as signIn } from "./router-XCAobyFt.js";
import { I as Input } from "./input-ClzkW5yJ.js";
import { L as Label } from "./label-CZrOwZFH.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from "./card-BhVZTf3b.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function LoginPage() {
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Preencha email e senha");
      return;
    }
    setLoading(true);
    try {
      await signIn(email, password);
      toast.success("Bem-vindo de volta!");
      navigate({
        to: "/"
      });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Dumbbell, { className: "h-6 w-6 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Entrar no FitTracker" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Acompanhe seus treinos e cargas" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", children: "Senha" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", className: "w-full", disabled: loading, children: [
        loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
        "Entrar"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground", children: [
        "Não tem conta?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", className: "font-medium text-primary hover:underline", children: "Cadastre-se" })
      ] })
    ] }) })
  ] }) });
}
export {
  LoginPage as component
};
