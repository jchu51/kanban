import { v4 as uuidv4 } from "uuid";
import { Event } from "../../../infrastructure/event";
import { AggregateRootId } from "./aggregate-root-id";

export abstract class AggregateRoot {
  protected id: AggregateRootId;
  protected _domainEvents: Event[] = [];

  constructor(id?: AggregateRootId) {
    this.id = id ?? new AggregateRootId(uuidv4());
  }

  get domainEvents(): Event[] {
    return this._domainEvents;
  }

  protected addDomainEvent(event: Event): void {
    this._domainEvents.push(event);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }
}
