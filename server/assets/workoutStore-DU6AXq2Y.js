import { c as createLucideIcon, h as create } from "./router-Du8WslyJ.js";
import { d as deleteWorkout, u as updateWorkout, c as createWorkout, l as listWorkouts } from "./workouts-q-RHBFQP.js";
const __iconNode = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode);
const useWorkoutStore = create((set, get) => ({
  workouts: [],
  loading: false,
  fetchWorkouts: async (userId) => {
    set({ loading: true });
    try {
      const workouts = await listWorkouts(userId);
      set({ workouts });
    } finally {
      set({ loading: false });
    }
  },
  createWorkout: async (userId, data) => {
    const id = await createWorkout(userId, data);
    set({ workouts: [...get().workouts, { id, ...data }] });
    return id;
  },
  updateWorkout: async (userId, id, data) => {
    await updateWorkout(userId, id, data);
    set({
      workouts: get().workouts.map((w) => w.id === id ? { ...w, ...data } : w)
    });
  },
  deleteWorkout: async (userId, id) => {
    await deleteWorkout(userId, id);
    set({ workouts: get().workouts.filter((w) => w.id !== id) });
  },
  upsertLocal: (w) => set({
    workouts: get().workouts.some((x) => x.id === w.id) ? get().workouts.map((x) => x.id === w.id ? w : x) : [...get().workouts, w]
  })
}));
export {
  Plus as P,
  useWorkoutStore as u
};
