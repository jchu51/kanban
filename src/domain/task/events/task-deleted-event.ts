import { DeleteTaskCommandPayload } from "../../../application/task/commands/task-commands";
import { Event } from "../../../infrastructure/event";

export class TaskDeletedEvent implements Event {
  constructor(
    public readonly aggregateId: string,
    public readonly payload: DeleteTaskCommandPayload
  ) {}

  get aggregateType() {
    return "TASK";
  }

  get eventType() {
    return "TASK_DELETED_EVENT";
  }
}
