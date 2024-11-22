import { PurchaseStatus } from "./../../common/enums/purchase-status.enum";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { PaymentEntity } from "./../../payment/entities/payment.entity";
import { BaseEntity } from "./../../common/config/base.entity";
import { CustomerEntity } from "./../../customer/entities/customer.entity";

@Entity('purchase')
export class PurchaseEntity extends BaseEntity {

    @Column({type: 'enum', enum: PurchaseStatus, default:PurchaseStatus.CANCELED})
    purchaseStatus: PurchaseStatus;

    @Column({type: 'varchar', unique: true})
    @ManyToOne(()=> PaymentEntity, (payment)=>payment.purchases)
    @JoinColumn({name:'payment_id'})
    paymentMethod: string;

    @ManyToOne(()=> CustomerEntity, (customer)=>customer.purchase)
    @JoinColumn({name:'customer_id'})
    customer: string;
   
    
}
