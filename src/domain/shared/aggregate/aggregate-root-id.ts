export class AggregateRootId {
  constructor(private readonly id: string) {}

  equals(other: AggregateRootId): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    if (!(other instanceof this.constructor)) {
      return false;
    }
    return other.toValue() === this.id;
  }

  toString(): string {
    return this.id;
  }

  toValue(): string {
    return this.id;
  }
}
