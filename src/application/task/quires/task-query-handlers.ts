import { TaskAggregate } from "../../../domain/task/aggregate/task-aggregates";
import { TaskRepository } from "../../../domain/task/repositories/task-repository";
import { QueryHandler } from "../../shared/handlers/query-handler";
import {
  GetTaskQuery,
  GetTaskQueryPayload,
  GetAllTaskQuery,
  GetAllTaskQueryPayload,
} from "./task-quires";

export class GetTaskQueryHandler
  implements
    QueryHandler<GetTaskQuery, GetTaskQueryPayload, TaskAggregate | undefined>
{
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(query: GetTaskQuery): Promise<TaskAggregate | undefined> {
    return this.taskRepository.findById(query.payload.taskId);
  }
}

export class GetAllTaskQueryHandler
  implements
    QueryHandler<GetAllTaskQuery, GetAllTaskQueryPayload, TaskAggregate[]>
{
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(): Promise<TaskAggregate[]> {
    return this.taskRepository.findAll();
  }
}
