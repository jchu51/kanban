import { Query } from "./query";

export abstract class QueryHandler<
  TQuery extends Query<TPayload>,
  TPayload,
  TResult
> {
  abstract execute(command: TQuery): Promise<TResult>;
}
