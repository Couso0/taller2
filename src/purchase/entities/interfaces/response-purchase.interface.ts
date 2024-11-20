import { PurchaseEntity } from "./../purchase.entity";


export interface ResponseAllPurchase{
    page: number;
    lastPage: number;
    limit: number;
    total: number;
    data: PurchaseEntity[];
}