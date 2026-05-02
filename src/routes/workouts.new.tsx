import { createFileRoute } from "@tanstack/react-router";
import { WorkoutNewPage } from "@/components/workouts/WorkoutNewPage";

export const Route = createFileRoute("/workouts/new")({ component: WorkoutNewPage });
