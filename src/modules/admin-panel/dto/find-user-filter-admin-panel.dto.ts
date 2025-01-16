import { IsEmail, IsPhoneNumber, IsString } from "class-validator";

export class FindUserFilterAdminPanelDto {
    @IsString()
    frstName:string
    @IsPhoneNumber()
    phone:string
    @IsEmail()
    email:string
}
 