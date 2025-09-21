import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_CLIENT } from './kafka.constant';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Producer } from '@nestjs/microservices/external/kafka.interface';
import { KafkaEvent } from './kafka.interface';

@Injectable()
export class KafkaService {
  constructor(
    @Inject(KAFKA_CLIENT) private readonly kafkaClient: ClientKafka,
  ) {}

  subscribeToResponseOf(pattern: string): void {
    return this.kafkaClient.subscribeToResponseOf(pattern);
  }

  connect(): Promise<Producer> {
    return this.kafkaClient.connect();
  }

  async send<Data, Result>(event: KafkaEvent<Data>): Promise<Result> {
    const req = this.kafkaClient.send(event.eventName, event.toString());
    const data = await firstValueFrom(req);

    return data;
  }

  async produce(event: KafkaEvent<unknown>): Promise<void> {
    const request = this.kafkaClient.emit(event.eventName, event.data);
    await lastValueFrom(request);
  }
}
