import { BaseEntity } from "src/common/config/base.entity";
import { PurchaseEntity } from "src/purchase/entities/purchase.entity";
import { Column, OneToMany } from "typeorm";

export class PaymentEntity extends BaseEntity { 

     @Column()
     @OneToMany(()=>PurchaseEntity, (purchase)=>purchase.paymentMethod)
     purchases: PurchaseEntity[];

     @Column({type:'varchar'})
     paymentMethod: string;

}
