import { U as jsxRuntimeExports } from "./worker-entry-BcyQEcY8.js";
import { W as WorkoutDetailPage } from "./WorkoutDetailPage-CmARJixY.js";
import { R as Route } from "./router-XCAobyFt.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./workouts-BIhoviBK.js";
import "./input-ClzkW5yJ.js";
import "./card-BhVZTf3b.js";
import "./arrow-left-ZyT_SFuZ.js";
function WorkoutDetailRoute() {
  const {
    workoutId
  } = Route.useParams();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(WorkoutDetailPage, { workoutId });
}
export {
  WorkoutDetailRoute as component
};
