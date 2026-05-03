import { l as deleteDoc, m as updateDoc, n as addDoc, o as getDocs, p as doc, q as collection, r as getDoc, v as setDoc, w as db, x as serverTimestamp } from "./router-Du8WslyJ.js";
const userWorkoutsCol = (userId) => collection(db, "users", userId, "workouts");
const workoutDoc = (userId, workoutId) => doc(db, "users", userId, "workouts", workoutId);
async function listWorkouts(userId) {
  const snap = await getDocs(userWorkoutsCol(userId));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
async function getWorkout(userId, workoutId) {
  const snap = await getDoc(workoutDoc(userId, workoutId));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}
async function createWorkout(userId, data) {
  console.log(userWorkoutsCol(userId).path);
  const ref = await addDoc(userWorkoutsCol(userId), {
    ...data,
    createdAt: serverTimestamp()
  });
  return ref.id;
}
async function updateWorkout(userId, workoutId, data) {
  await updateDoc(workoutDoc(userId, workoutId), data);
}
async function deleteWorkout(userId, workoutId) {
  await deleteDoc(workoutDoc(userId, workoutId));
}
async function saveExerciseWeight(userId, workoutId, exerciseId, weight) {
  const w = await getWorkout(userId, workoutId);
  if (!w) throw new Error("Workout not found");
  const entry = { date: (/* @__PURE__ */ new Date()).toISOString(), weight };
  const exercises = w.exercises.map(
    (ex) => ex.id === exerciseId ? { ...ex, history: [...ex.history ?? [], entry] } : ex
  );
  await setDoc(workoutDoc(userId, workoutId), { ...w, exercises }, { merge: true });
  return { ...w, exercises };
}
export {
  createWorkout as c,
  deleteWorkout as d,
  getWorkout as g,
  listWorkouts as l,
  saveExerciseWeight as s,
  updateWorkout as u
};
