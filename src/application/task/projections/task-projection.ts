import { AggregateRootId } from "../../../domain/shared/aggregate/aggregate-root-id";
import { TaskAggregate } from "../../../domain/task/aggregate/task-aggregates";
import {
  TaskCreatedEvent,
  TaskDeletedEvent,
  TaskUpdatedEvent,
} from "../../../domain/task/events";
import { InMemoryEventStoreRepository } from "../../../infrastructure/event-store/in-memory-event-store-repository";
import { InMemoryTaskRepository } from "../../../infrastructure/task/in-memory-task-repository";

export class TaskProjection {
  private bookmark: number;

  constructor(
    private readonly eventStoreRepository: InMemoryEventStoreRepository,
    private readonly taskRepository: InMemoryTaskRepository
  ) {
    this.bookmark = 0;
  }

  getTaskById = async (id: string): Promise<TaskAggregate | undefined> => {
    return this.taskRepository.findById(id);
  };

  getAllTask = async (): Promise<TaskAggregate[]> => {
    return this.taskRepository.findAll();
  };

  // Apply task created event to the repository
  private handleTaskCreated = async (event: TaskCreatedEvent) => {
    const task = new TaskAggregate(
      new AggregateRootId(event.aggregateId),
      event.payload.name,
      event.payload.description,
      event.payload.status,
      event.payload.subtasks
    );
    await this.taskRepository.save(task);
  };

  // Apply task updated event to the repository
  private handleTaskUpdated = async (event: TaskUpdatedEvent) => {
    const task = await this.taskRepository.findById(event.aggregateId);
    if (task) {
      await task.updateTask(event);

      await this.taskRepository.save(task);
    }
  };

  // Apply task deleted event to the repository
  private handleTaskDeleted = async (event: TaskDeletedEvent) => {
    await this.taskRepository.delete(event.aggregateId);
  };

  subscribeToEventsStream = async () => {
    await this.eventStoreRepository.subscribeToStream(
      "TASK",
      this.bookmark,
      async (event) => {
        switch (event.eventType) {
          case "TASK_CREATED_EVENT": {
            await this.handleTaskCreated(event);
            break;
          }
          case "TASK_UPDATED_EVENT": {
            await this.handleTaskUpdated(event);
            break;
          }
          case "TASK_DELETED_EVENT": {
            await this.handleTaskDeleted(event);
            break;
          }
          default: {
            break;
          }
        }
        this.bookmark += 1;
      }
    );
  };
}
