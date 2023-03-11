import { Query } from "../../shared/handlers/query";

export interface GetTaskQueryPayload {
  taskId: string;
}

export interface GetAllTaskQueryPayload {}

export class GetTaskQuery extends Query<GetTaskQueryPayload> {
  constructor(payload: GetTaskQueryPayload) {
    // super("GetTask", payload);

    super(payload);
  }
}

export class GetAllTaskQuery extends Query<GetAllTaskQueryPayload> {
  constructor(payload: GetAllTaskQueryPayload) {
    // super("GetAllTask", payload);
    super(payload);
  }
}
