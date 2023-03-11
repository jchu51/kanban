import { UpdateTaskCommandPayload } from "../../../application/task/commands/task-commands";
import { Event } from "../../../infrastructure/event";

export class TaskUpdatedEvent implements Event {
  constructor(
    public readonly aggregateId: string,
    public readonly payload: UpdateTaskCommandPayload
  ) {}

  get aggregateType() {
    return "TASK";
  }

  get eventType() {
    return "TASK_UPDATED_EVENT";
  }
}
