import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { InternalAccountModule } from '../internal/account/account.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    InternalAccountModule,
    TransactionModule,
  ],
})
export class AppModule {}
