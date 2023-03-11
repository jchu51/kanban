export abstract class Command<TPayload> {
  constructor(public readonly payload: TPayload) {}
}
