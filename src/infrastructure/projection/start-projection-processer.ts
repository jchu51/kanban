import { TaskProjection } from "../../application/task/projections/task-projection";

export function startProjectionProcessor(taskProjection: TaskProjection): void {
  setInterval(async () => {
    await taskProjection.subscribeToEventsStream();
  }, 1000 * 1);
}
