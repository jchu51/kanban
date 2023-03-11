import { Event } from "../event";
import { EventBus } from "./event-bus";

export class EventPublisher {
  constructor(private readonly eventBus: EventBus) {}

  async publish(event: Event): Promise<void> {
    await this.eventBus.publish(event);
  }
}
