import { TaskAggregate } from "../../../domain/task/aggregate/task-aggregates";
import {
  GetAllTaskQueryHandler,
  GetTaskQueryHandler,
} from "../quires/task-query-handlers";
import { GetTaskQuery } from "../quires/task-quires";

export class TaskQueryService {
  constructor(
    private readonly getTaskQueryHandler: GetTaskQueryHandler,
    private readonly getAllTasksQueryHandler: GetAllTaskQueryHandler
  ) {}

  async getTask(query: GetTaskQuery): Promise<TaskAggregate | undefined> {
    return this.getTaskQueryHandler.execute(query);
  }

  async getAllTasks(): Promise<TaskAggregate[]> {
    return this.getAllTasksQueryHandler.execute();
  }
}
