import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionDto } from './dto/transaction.dto';
import { GetTransactionsFilterDto } from './dto/get-transactions-filter.dto';

@Controller()
export class TransactionColtroller {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async create(@Body() dto: CreateTransactionDto): Promise<void> {
    return this.transactionService.create(dto);
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<TransactionDto> {
    return this.transactionService.getTransaction(id);
  }

  @Get()
  async getTransactions(
    @Query() query: GetTransactionsFilterDto,
  ): Promise<{ items: TransactionDto[]; total: number }> {
    return this.transactionService.getTransactions(query);
  }
}
