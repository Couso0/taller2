import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { PurchaseStatus } from "src/common/enums/purchase-status.enum";

export class CreatePurchaseDto {
    @IsNotEmpty()
    @IsEnum(PurchaseStatus)
    status: PurchaseStatus;
 
    
    @IsString()
    @IsNotEmpty()
    paymentMethod: string;
}