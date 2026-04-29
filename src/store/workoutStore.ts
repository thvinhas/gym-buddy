import { create } from "zustand";
import type { Workout } from "@/services/workouts";
import * as workoutsService from "@/services/workouts";

type WorkoutState = {
  workouts: Workout[];
  loading: boolean;
  fetchWorkouts: (userId: string) => Promise<void>;
  createWorkout: (userId: string, data: Omit<Workout, "id">) => Promise<string>;
  updateWorkout: (userId: string, id: string, data: Partial<Omit<Workout, "id">>) => Promise<void>;
  deleteWorkout: (userId: string, id: string) => Promise<void>;
  upsertLocal: (w: Workout) => void;
};

export const useWorkoutStore = create<WorkoutState>((set, get) => ({
  workouts: [],
  loading: false,
  fetchWorkouts: async (userId) => {
    set({ loading: true });
    try {
      const workouts = await workoutsService.listWorkouts(userId);
      set({ workouts });
    } finally {
      set({ loading: false });
    }
  },
  createWorkout: async (userId, data) => {
    const id = await workoutsService.createWorkout(userId, data);
    set({ workouts: [...get().workouts, { id, ...data }] });
    return id;
  },
  updateWorkout: async (userId, id, data) => {
    await workoutsService.updateWorkout(userId, id, data);
    set({
      workouts: get().workouts.map((w) => (w.id === id ? { ...w, ...data } : w)),
    });
  },
  deleteWorkout: async (userId, id) => {
    await workoutsService.deleteWorkout(userId, id);
    set({ workouts: get().workouts.filter((w) => w.id !== id) });
  },
  upsertLocal: (w) =>
    set({
      workouts: get().workouts.some((x) => x.id === w.id)
        ? get().workouts.map((x) => (x.id === w.id ? w : x))
        : [...get().workouts, w],
    }),
}));
