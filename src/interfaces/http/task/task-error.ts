export class TaskNotFoundError extends Error {
  constructor(id: string) {
    super(`Task Not found id: ${id}`);
    this.name = "TaskNotFoundError";
  }
}
