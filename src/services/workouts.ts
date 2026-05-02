import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export type WeightEntry = { date: string; weight: number };

export type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: number;
  equipment?: string;
  history: WeightEntry[];
};

export type Workout = {
  id: string;
  name: string;
  exercises: Exercise[];
  createdAt?: unknown;
};

const userWorkoutsCol = (userId: string) =>
  collection(db, "users", userId, "workouts");

const workoutDoc = (userId: string, workoutId: string) =>
  doc(db, "users", userId, "workouts", workoutId);

export async function listWorkouts(userId: string): Promise<Workout[]> {
  const snap = await getDocs(userWorkoutsCol(userId));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Workout, "id">) }));
}

export async function getWorkout(userId: string, workoutId: string): Promise<Workout | null> {
  const snap = await getDoc(workoutDoc(userId, workoutId));
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as Omit<Workout, "id">) };
}

export async function createWorkout(
  userId: string,
  data: Omit<Workout, "id">,
): Promise<string> {
  console.log(userWorkoutsCol(userId).path);
  const ref = await addDoc(userWorkoutsCol(userId), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
  
}

export async function updateWorkout(
  userId: string,
  workoutId: string,
  data: Partial<Omit<Workout, "id">>,
): Promise<void> {
  await updateDoc(workoutDoc(userId, workoutId), data as Record<string, unknown>);
}

export async function deleteWorkout(userId: string, workoutId: string): Promise<void> {
  await deleteDoc(workoutDoc(userId, workoutId));
}

export async function saveExerciseWeight(
  userId: string,
  workoutId: string,
  exerciseId: string,
  weight: number,
): Promise<Workout> {
  const w = await getWorkout(userId, workoutId);
  if (!w) throw new Error("Workout not found");
  const entry: WeightEntry = { date: new Date().toISOString(), weight };
  const exercises = w.exercises.map((ex) =>
    ex.id === exerciseId ? { ...ex, history: [...(ex.history ?? []), entry] } : ex,
  );
  await setDoc(workoutDoc(userId, workoutId), { ...w, exercises }, { merge: true });
  return { ...w, exercises };
}
