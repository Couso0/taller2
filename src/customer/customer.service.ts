import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PaginationDto } from './../common/dtos/pagination/pagination.dto';
import { ManagerError } from 'src/common/errors/manager.error';
import { Repository, UpdateResult } from 'typeorm';
import { CustomerEntity } from './entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiAllResponse } from 'src/common/interfaces/api-response.interface';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>
  ) { }

  async create(createCustomerDto: CreateCustomerDto): Promise<CustomerEntity> {
    try {
      const customer = await this.customerRepository.save(createCustomerDto);
      if (!customer) {
        throw new ManagerError({
          type: 'CONFLICT',
          message: 'customer not created!',
        });
      }
      return customer;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findAll(paginationDto: PaginationDto):  Promise<ApiAllResponse<CustomerEntity>> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {
      // const total = await this.categoryRepository.count({ where: { isActive: true } });
      // const data = await this.categoryRepository.find({ where: { isActive: true }, take: limit, skip: skip })
      const [total, data] = await Promise.all([
        this.customerRepository.count({ where: { isActive: true } }),
        this.customerRepository.createQueryBuilder('customer')
          .where({ isActive: true })
          .leftJoinAndSelect('customer.purchase', 'purchase')
          .take(limit)
          .skip(skip)
          .getMany()
      ]);
      const lastPage = Math.ceil(total / limit);

      if (!data) {
        new ManagerError({
          type: "NOT_FOUND",
          message: "No hay customers"
        })
      }

      return {
        meta:{
          page,
          limit,
          lastPage,
          total,
        },
        data,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findOne(id: string): Promise<CustomerEntity> {
    try {
      const customer = await this.customerRepository.createQueryBuilder('customer')
        .where({ isActive: true })
        .leftJoinAndSelect('customer.purchase', 'purchase')
        .getOne()

      if (!customer) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'customer not found',
        });
      }

      return customer;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<UpdateResult> {
    try {
      const customer = await this.customerRepository.update(id, updateCustomerDto)
      if (customer.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'customer not found',
        });
      }

      return customer;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async remove(id: string): Promise<UpdateResult> {
    try {
      const customer = await this.customerRepository.update({ id }, { isActive: false })
      if (customer.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'customer not found',
        });
      }

      return customer;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
}