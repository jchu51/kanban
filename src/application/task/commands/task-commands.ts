import { Subtask } from "../../../domain/task/valueObjects/subtask";
import { Command } from "../../shared/handlers/command";

export interface CreateTaskCommandPayload {
  name: string;
  description: string;
  status: string;
  subtasks: Subtask[];
}

export interface DeleteTaskCommandPayload {
  taskId: string;
}

export interface UpdateTaskCommandPayload {
  taskId: string;
  name: string;
  description: string;
  status: string;
  subtasks: Subtask[];
}

export class CreateTaskCommand extends Command<CreateTaskCommandPayload> {
  constructor(payload: CreateTaskCommandPayload) {
    // super("CreateTask", payload);
    super(payload);
  }
}

export class DeleteTaskCommand extends Command<DeleteTaskCommandPayload> {
  constructor(payload: DeleteTaskCommandPayload) {
    // super("DeleteTask", payload);
    super(payload);
  }
}

export class UpdateTaskCommand extends Command<UpdateTaskCommandPayload> {
  constructor(payload: UpdateTaskCommandPayload) {
    // super("UpdateTask", payload);
    super(payload);
  }
}
