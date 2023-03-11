export abstract class Query<TPayload> {
  constructor(
    // public readonly type: string,
    public readonly payload: TPayload
  ) {}
}
