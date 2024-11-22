import { BaseEntity } from "../../common/config/base.entity";
import { PurchaseEntity } from "../../purchase/entities/purchase.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity({name: 'payment_method'})
export class PaymentEntity extends BaseEntity { 

     @OneToMany(()=>PurchaseEntity, (purchase)=>purchase.paymentMethod)
     purchases: PurchaseEntity[];

     @Column({type:'varchar'})
     paymentMethod: string;

}
