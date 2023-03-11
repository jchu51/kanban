import { TaskCreatedEvent } from "./task-created-event";
import { TaskDeletedEvent } from "./task-deleted-event";
import { TaskUpdatedEvent } from "./task-updated-event";

type TaskEventTypes =
  | "TASK_CREATED_EVENT"
  | "TASK_DELETED_EVENT"
  | "TASK_UPDATED_EVENT";

type TaskEvents = TaskCreatedEvent | TaskDeletedEvent | TaskUpdatedEvent;

export {
  TaskEventTypes,
  TaskEvents,
  TaskCreatedEvent,
  TaskDeletedEvent,
  TaskUpdatedEvent,
};
