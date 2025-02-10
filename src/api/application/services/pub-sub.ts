export interface PubSub {
  publish<T>(channel: string, message: T): Promise<void>;
}
