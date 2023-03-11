import {
  CreateTaskCommandHandler,
  DeleteTaskCommandHandler,
  UpdateTaskCommandHandler,
} from "../commands/task-command-handlers";
import {
  CreateTaskCommand,
  DeleteTaskCommand,
  UpdateTaskCommand,
} from "../commands/task-commands";

export class TaskCommandService {
  constructor(
    private readonly createTaskCommandHandler: CreateTaskCommandHandler,
    private readonly updateTaskCommandHandler: UpdateTaskCommandHandler,
    private readonly deleteTaskCommandHandler: DeleteTaskCommandHandler
  ) {}

  async createTask(command: CreateTaskCommand): Promise<void> {
    await this.createTaskCommandHandler.execute(command);
  }

  async updateTask(command: UpdateTaskCommand): Promise<void> {
    await this.updateTaskCommandHandler.execute(command);
  }

  async deleteTask(command: DeleteTaskCommand): Promise<void> {
    await this.deleteTaskCommandHandler.execute(command);
  }
}
