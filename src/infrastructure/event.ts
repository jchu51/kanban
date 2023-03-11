export interface Event {
  aggregateId: string;
  aggregateType: string;
  eventType: string;
  payload: Record<string, any>;
}
