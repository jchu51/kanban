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
import {
  TaskCreatedEvent,
  TaskDeletedEvent,
  TaskUpdatedEvent,
} from "../../../domain/task/events";
import { TaskNotFoundError } from "../../../interfaces/http/task/task-error";
import { EventStoreRepository } from "../../../infrastructure/event-store/event-store";

export class CreateTaskCommandHandler
  implements CommandHandler<CreateTaskCommand, CreateTaskCommandPayload, void>
{
  constructor(private readonly eventStoreRepository: EventStoreRepository) {}

  async execute(command: CreateTaskCommand): Promise<void> {
    const event = new TaskCreatedEvent(command.payload.taskId, command.payload);
    await this.eventStoreRepository.save(event);
  }
}

export class UpdateTaskCommandHandler
  implements CommandHandler<UpdateTaskCommand, UpdateTaskCommandPayload, void>
{
  constructor(private readonly eventStoreRepository: EventStoreRepository) {}

  async execute(command: UpdateTaskCommand): Promise<void> {
    const task = await getTaskById(
      this.eventStoreRepository,
      command.payload.taskId
    );

    const event = new TaskUpdatedEvent(command.payload.taskId, command.payload);
    task.updateTask(event);

    await this.eventStoreRepository.save(event);
  }
}

export class DeleteTaskCommandHandler
  implements CommandHandler<DeleteTaskCommand, DeleteTaskCommandPayload, void>
{
  constructor(private readonly eventStoreRepository: EventStoreRepository) {}

  async execute(command: DeleteTaskCommand): Promise<void> {
    const task = await getTaskById(
      this.eventStoreRepository,
      command.payload.taskId
    );

    const event = new TaskDeletedEvent(command.payload.taskId, command.payload);
    task.deleteTask(event);

    await this.eventStoreRepository.save(event);
  }
}

const getTaskById = async (
  eventStoreRepository: EventStoreRepository,
  id: string
): Promise<TaskAggregate> => {
  let task: TaskAggregate;
  const events = await eventStoreRepository.getEventsByAggregateId(id);

  if (events.length === 0) {
    throw new TaskNotFoundError(id);
  }

  task = new TaskAggregate(
    events[0].payload.taskId,
    events[0].payload.name,
    events[0].payload.description,
    events[0].payload.status,
    events[0].payload.subtasks
  );
  // task.loadFromHistory(events);

  return task;
};
