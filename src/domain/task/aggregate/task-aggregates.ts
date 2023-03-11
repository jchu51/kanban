import { AggregateRoot } from "../../shared/aggregate/aggregate-root";
import {
  TaskCreatedEvent,
  TaskDeletedEvent,
  TaskEvents,
  TaskUpdatedEvent,
} from "../events/index";
import { Subtask } from "../valueObjects/subtask";
import { AggregateRootId } from "../../shared/aggregate/aggregate-root-id";

export class TaskAggregate extends AggregateRoot {
  private _taskId: string;
  private _name: string;
  private _description: string;
  private _status: string;
  private _isDeleted: boolean;
  private _subtasks: Subtask[];

  constructor(
    taskId: AggregateRootId,
    name: string,
    description: string,
    status: string,
    subtasks: Subtask[]
  ) {
    super(taskId);
    this._taskId = taskId.toString();
    this._name = name;
    this._description = description;
    this._status = status;
    this._isDeleted = false;
    this._subtasks = subtasks;

    const event: TaskCreatedEvent = new TaskCreatedEvent(this._taskId, {
      taskId: this._taskId,
      name: this._name,
      description: this._description,
      status: this._status,
      subtasks: this._subtasks,
    });

    this.createTask(event);
  }

  get taskId(): string {
    return this._taskId;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get status(): string {
    return this._status;
  }

  get isDeleted(): boolean {
    return this._isDeleted;
  }

  get subtasks(): Subtask[] {
    return this._subtasks;
  }

  createTask = async (event: TaskCreatedEvent): Promise<void> => {
    this.addDomainEvent(event);
  };

  deleteTask = async (event: TaskDeletedEvent): Promise<void> => {
    this._isDeleted = true;
    this.addDomainEvent(event);
  };

  updateTask = async (event: TaskUpdatedEvent): Promise<void> => {
    const { name, description, subtasks, status } = event.payload;

    this._name = name;
    this._description = description;
    this._subtasks = subtasks;
    this._status = status;

    this.addDomainEvent(event);
  };
}
