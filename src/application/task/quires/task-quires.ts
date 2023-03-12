import { Validator } from "../../../shared/validator/validator";
import { Query } from "../../shared/handlers/query";

export interface GetTaskQueryPayload {
  taskId: string;
}

export interface GetAllTaskQueryPayload {}

export class GetTaskQuery extends Query<GetTaskQueryPayload> {
  private validator: Validator;
  constructor(payload: GetTaskQueryPayload) {
    super(payload);
    this.validator = new Validator();
    this.validate();
  }

  validate = (): void => {
    if (!this.validator.isString(this.payload.taskId)) {
      throw new Error("Task id is not string");
    }

    if (this.validator.isEmptyString(this.payload.taskId)) {
      throw new Error("Task id is empty");
    }
  };
}

export class GetAllTaskQuery extends Query<GetAllTaskQueryPayload> {
  constructor(payload: GetAllTaskQueryPayload) {
    super(payload);
  }

  validate = () => {};
}
