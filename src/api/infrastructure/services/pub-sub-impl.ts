import amqp from "amqplib";
import { PubSub } from "../../application/services/pub-sub";
import { Logger } from "../../shared/core/logger";

export class RabbitMQPublisher implements PubSub {
  private connection!: amqp.Connection;
  private channel!: amqp.Channel;

  constructor(private readonly rabbitMQUrl: string) {}

  private async connect(): Promise<void> {
    if (!this.connection) {
      this.connection = await amqp.connect(this.rabbitMQUrl);
      this.channel = await this.connection.createChannel();
      Logger.info("🟢 RabbitMQ Connected");
      console.log("🟢 RabbitMQ Connected");
    }
  }

  async publish<T>(channel: string, message: T): Promise<void> {
    if (!this.channel) {
      await this.connect();
    }

    await this.channel.assertExchange(channel, "fanout", { durable: true });
    this.channel.publish(channel, "", Buffer.from(JSON.stringify(message)));
    Logger.info(`📢 Message Published on channel: ${channel}`);
    console.log(`📢 Message Published on channel: ${channel}`);
  }
}
