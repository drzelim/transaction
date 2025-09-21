import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InternalAccountModule } from '../../internal/account/account.module';
import { TransactionColtroller } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { KafkaModule } from '../../config/kafka/kafka.module';
import { TransactionRepository } from './transaction.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { TransactionKafkaController } from './transaction.kafka-controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntity]),
    InternalAccountModule,
    ConfigModule,
    KafkaModule,
  ],
  controllers: [TransactionColtroller, TransactionKafkaController],
  providers: [TransactionService, TransactionRepository],
})
export class TransactionModule {}
