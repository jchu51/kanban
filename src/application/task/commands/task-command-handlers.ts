import { TaskAggregate } from "../../../domain/task/aggregate/task-aggregates";
import { CommandHandler } from "../../shared/handlers/command-handler";
import {
  CreateTaskCommand,
  CreateTaskCommandPayload,
  DeleteTaskCommand,
  DeleteTaskCommandPayload,
  UpdateTaskCommand,
  UpdateTaskCommandPayload,
} from "./task-commands";

import { TaskNotFoundError } from "../../../interfaces/http/task/task-error";
import { TaskRepository } from "../../../domain/task/repositories/task-repository";

export class CreateTaskCommandHandler
  implements
    CommandHandler<CreateTaskCommand, CreateTaskCommandPayload, TaskAggregate>
{
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(command: CreateTaskCommand): Promise<TaskAggregate> {
    const task = await TaskAggregate.createTask(command);
    return this.taskRepository.save(task);
  }
}

export class UpdateTaskCommandHandler
  implements
    CommandHandler<UpdateTaskCommand, UpdateTaskCommandPayload, TaskAggregate>
{
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(command: UpdateTaskCommand): Promise<TaskAggregate> {
    const task = await getTaskById(this.taskRepository, command.payload.taskId);

    task.updateTask(command);

    return this.taskRepository.save(task);
  }
}

export class DeleteTaskCommandHandler
  implements CommandHandler<DeleteTaskCommand, DeleteTaskCommandPayload, void>
{
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(command: DeleteTaskCommand): Promise<void> {
    const task = await getTaskById(this.taskRepository, command.payload.taskId);

    task.deleteTask(command);

    await this.taskRepository.save(task);
  }
}

const getTaskById = async (
  taskRepository: TaskRepository,
  id: string
): Promise<TaskAggregate> => {
  const task = await taskRepository.findById(id);

  if (!task) {
    throw new TaskNotFoundError(id);
  }

  return task;
};
