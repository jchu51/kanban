import { TaskAggregate } from "../../../domain/task/aggregate/task-aggregates";
import { QueryHandler } from "../../shared/handlers/query-handler";
import { TaskProjection } from "../projections/task-projection";
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
  constructor(private readonly taskProjection: TaskProjection) {}

  async execute(query: GetTaskQuery): Promise<TaskAggregate | undefined> {
    return this.taskProjection.getTaskById(query.payload.taskId);
  }
}

export class GetAllTaskQueryHandler
  implements
    QueryHandler<GetAllTaskQuery, GetAllTaskQueryPayload, TaskAggregate[]>
{
  constructor(private readonly taskProjection: TaskProjection) {}

  async execute(): Promise<TaskAggregate[]> {
    return this.taskProjection.getAllTask();
  }
}
