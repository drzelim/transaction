import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { TransactionStatus, TransactionType } from '../transaction.types';

export class GetTransactionsFilterDto {
  @ApiProperty({
    description: 'Идентификаторы транзакций',
    type: [String],
  })
  @IsString()
  @IsOptional()
  @Expose()
  ids: string[];

  @ApiProperty({
    description: 'Идентификатор пользователей',
    type: [String],
  })
  @IsString()
  @IsOptional()
  @Expose()
  userIds: string[];

  @ApiProperty({
    description: 'сумма',
    type: [String],
  })
  @IsString()
  @IsOptional()
  @Expose()
  amounts: string[];

  @ApiProperty({
    description: 'Тип транзакции',
    required: false,
    enum: TransactionType,
  })
  @Expose()
  @IsOptional()
  @IsEnum(TransactionType)
  TransactionType?: TransactionType;

  @ApiProperty({
    description: 'Статус транзакции',
    required: false,
    enum: TransactionStatus,
  })
  @Expose()
  @IsOptional()
  @IsEnum(TransactionStatus)
  status?: TransactionStatus;

  @ApiProperty({
    description: '',
    type: Number,
    required: false,
    example: 20,
  })
  @IsOptional()
  @IsNumber()
  readonly take?: number;

  @ApiProperty({
    description: '',
    type: Number,
    required: false,
    example: 20,
  })
  @IsOptional()
  @IsNumber()
  readonly skip?: number;
}
