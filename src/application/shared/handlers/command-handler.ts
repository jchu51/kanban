import { Command } from "./command";

export abstract class CommandHandler<
  TCommand extends Command<TPayload>,
  TPayload,
  TResult
> {
  abstract execute(command: TCommand): Promise<TResult>;
}
