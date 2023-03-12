import { TaskAggregate } from "../../domain/task/aggregate/task-aggregates";
import { TaskRepository } from "../../domain/task/repositories/task-repository";

export class InMemoryTaskRepository implements TaskRepository {
  tasks: TaskAggregate[] = [];

  save = async (task: TaskAggregate): Promise<TaskAggregate> => {
    const tasks = this.tasks.filter((t) => t.id !== task.id);

    tasks.push(task);
    this.tasks = tasks;

    return new TaskAggregate(
      task.name,
      task.description,
      task.status,
      task.subtasks
    );
  };

  delete = async (taskId: string): Promise<void> => {
    const tasks = this.tasks.filter((t) => t.id !== taskId);
    this.tasks = tasks;
  };

  findAll = async (): Promise<TaskAggregate[]> => {
    return this.tasks;
  };

  findById = async (taskId: string): Promise<TaskAggregate | undefined> => {
    const task = this.tasks.find((t) => t.id === taskId);

    if (!task) {
      return undefined;
    }

    return new TaskAggregate(
      task.name,
      task.description,
      task.status,
      task.subtasks
    );
  };
}
