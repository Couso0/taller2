import { PurchaseStatus } from "src/common/enums/purchase-status.enum";
import { Column, JoinColumn, ManyToOne } from "typeorm";
import { PaymentEntity } from "src/payment/entities/payment.entity";
import { BaseEntity } from "src/common/config/base.entity";

export class PurchaseEntity extends BaseEntity {

    @Column({type: 'enum', enum: PurchaseStatus,default:PurchaseStatus.CANCELED})
    purchaseStatus: PurchaseStatus;

    @Column({type: 'varchar', unique: true})
    @ManyToOne(()=> PaymentEntity, (payment)=>payment.purchases)
    @JoinColumn({name:'payment_id'})
    paymentMethod: string;
   
    
}
