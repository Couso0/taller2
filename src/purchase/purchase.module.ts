import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseEntity } from './entities/purchase.entity';

@Module({
  controllers: [PurchaseController],
  providers: [PurchaseService],
  imports: [
    TypeOrmModule.forFeature([ PurchaseEntity ])
  ],
  exports: [PurchaseService]
})
export class PurchaseModule {}
