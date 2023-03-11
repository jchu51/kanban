import { CreateTaskCommandPayload } from "../../../application/task/commands/task-commands";
import { Event } from "../../../infrastructure/event";

export class TaskCreatedEvent implements Event {
  constructor(
    public readonly aggregateId: string,
    public readonly payload: CreateTaskCommandPayload
  ) {}

  get aggregateType() {
    return "TASK";
  }

  get eventType() {
    return "TASK_CREATED_EVENT";
  }
}
