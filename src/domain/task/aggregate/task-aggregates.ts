import { AggregateRoot } from "../../shared/aggregate/aggregate-root";
import { Subtask } from "../valueObjects/subtask";
import {
  CreateTaskCommand,
  DeleteTaskCommand,
  UpdateTaskCommand,
} from "../../../application/task/commands/task-commands";

export class TaskAggregate extends AggregateRoot {
  private _name: string;
  private _description: string;
  private _status: string;
  private _isDeleted: boolean;
  private _subtasks: Subtask[];

  constructor(
    name: string,
    description: string,
    status: string,
    subtasks: Subtask[]
  ) {
    super();
    this._name = name;
    this._description = description;
    this._status = status;
    this._isDeleted = false;
    this._subtasks = subtasks;
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

  static createTask = async (
    command: CreateTaskCommand
  ): Promise<TaskAggregate> => {
    return new TaskAggregate(
      command.payload.name,
      command.payload.description,
      command.payload.status,
      command.payload.subtasks
    );
  };

  deleteTask = async (_command: DeleteTaskCommand): Promise<void> => {
    this._isDeleted = true;
  };

  updateTask = async (command: UpdateTaskCommand): Promise<void> => {
    const { name, description, subtasks, status } = command.payload;

    this._name = name;
    this._description = description;
    this._subtasks = subtasks;
    this._status = status;
  };
}
