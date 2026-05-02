import { createFileRoute } from "@tanstack/react-router";
import { WorkoutDetailPage } from "@/components/workouts/detail/WorkoutDetailPage";

function WorkoutDetailRoute() {
  const { workoutId } = Route.useParams();
  return <WorkoutDetailPage workoutId={workoutId} />;
}

export const Route = createFileRoute("/workouts/")({ component: WorkoutDetailRoute });
