import { Event } from "../event";
import { EventBus } from "./event-bus";

export abstract class EventSubscriber {
  protected constructor(private readonly eventBus: EventBus) {}

  abstract eventName(): string;

  abstract handle(event: Event): Promise<void>;

  subscribe = async () => {
    await this.eventBus.subscribe(this.eventName(), this.handle);
  };
}
