import { createFileRoute } from "@tanstack/react-router";
import { WorkoutAreaPage } from "@/components/workouts/area/WorkoutAreaPage";

export const Route = createFileRoute("/workouts/area")({ component: WorkoutAreaPage });
