import { PaymentEntity } from "../entities/payment.entity";

export interface ResponseAllPayment{
    page: number;
    lastPage: number;
    limit: number;
    total: number;
    data: PaymentEntity[];
}