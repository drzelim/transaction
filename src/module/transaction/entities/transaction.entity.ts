import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from '../../database/abstract.entity';
import { TransactionStatus, TransactionType } from '../transaction.types';

@Entity({
  name: 'transaction',
})
export class TransactionEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid', {
    comment: 'Идентификатор транзакции',
    name: 'id',
  })
  readonly id: string;

  @Column('varchar', {
    comment: 'Идентификатор пользователя, совершающего транзакцию',
    nullable: false,
  })
  userId: string;

  @Column('varchar', {
    comment: 'Сумма транзакции в копейках',
    nullable: false,
  })
  amount: string;

  @Column('enum', {
    comment: 'Тип транзакции',
    name: 'type',
    enum: TransactionType,
  })
  type: TransactionType;

  @Column('enum', {
    comment: 'Статус транзакции',
    name: 'status',
    enum: TransactionStatus,
    default: TransactionStatus.INPROGRESS,
  })
  status?: TransactionStatus;
}
