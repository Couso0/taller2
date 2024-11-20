import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ManagerError } from 'src/common/errors/manager.error';
import { Repository, UpdateResult } from 'typeorm';
import { PaymentEntity } from './entities/payment.entity';
import { PaginationDto } from './../common/dtos/pagination/pagination.dto';
import { ResponseAllPayment } from './interfaces/response-payment.interfaces';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>
  ) { }

  async create(createPaymentDto: CreatePaymentDto): Promise<PaymentEntity> {
    try {
      const payment = await this.paymentRepository.save(createPaymentDto);
      if (!payment) {
        throw new ManagerError({
          type: 'CONFLICT',
          message: 'Payment not created!',
        });
      }
      return payment;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ResponseAllPayment> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {
      // const total = await this.categoryRepository.count({ where: { isActive: true } });
      // const data = await this.categoryRepository.find({ where: { isActive: true }, take: limit, skip: skip })
      const [total, data] = await Promise.all([
        this.paymentRepository.count({ where: { isActive: true } }),
        this.paymentRepository.createQueryBuilder('payment')
          .where({ isActive: true })
          .leftJoinAndSelect('payment.purchase', 'purchase')
          .take(limit)
          .skip(skip)
          .getMany()
      ]);
      const lastPage = Math.ceil(total / limit);

      if (!data) {
        new ManagerError({
          type: "NOT_FOUND",
          message: "No hay Paymentos"
        })
      }

      return {
        page,
        limit,
        lastPage,
        total,
        data,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findOne(id: string): Promise<PaymentEntity> {
    try {
      const payment = await this.paymentRepository.createQueryBuilder('payment')
        .where({ isActive: true })
        .leftJoinAndSelect('payment.purchase', 'purchase')
        .getOne()

      if (!payment) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Payment not found',
        });
      }

      return payment;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto): Promise<UpdateResult> {
    try {
      const payment = await this.paymentRepository.update(id, updatePaymentDto)
      if (payment.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Payment not found',
        });
      }

      return payment;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async remove(id: string): Promise<UpdateResult> {
    try {
      const payment = await this.paymentRepository.update({ id }, { isActive: false })
      if (payment.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Payment not found',
        });
      }

      return payment;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
}
