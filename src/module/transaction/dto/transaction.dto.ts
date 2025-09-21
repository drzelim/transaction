import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum } from 'class-validator';
import { TransactionStatus, TransactionType } from '../transaction.types';
import { Expose } from 'class-transformer';

export class TransactionDto {
  @ApiProperty({
    description: 'Идентификатор транзакции',
    type: String,
  })
  @IsString()
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Идентификатор пользователя',
    type: String,
  })
  @IsString()
  @Expose()
  userId: string;

  @ApiProperty({
    description: 'Сумма в копейках',
    type: String,
  })
  @IsString()
  @Expose()
  amount: string;

  @ApiProperty({
    description: 'Тип транзакции',
    required: false,
    enum: TransactionType,
  })
  @Expose()
  @IsEnum(TransactionType)
  transactionType?: TransactionType;

  @ApiProperty({
    description: 'Статус транзакции',
    required: false,
    enum: TransactionStatus,
  })
  @Expose()
  @IsEnum(TransactionStatus)
  status?: TransactionStatus;
}
