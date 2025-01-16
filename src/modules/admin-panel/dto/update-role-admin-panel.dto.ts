import { IsEmail, IsIn, IsNumber, IsPhoneNumber, IsString } from "class-validator";

export class UpdateRoleAdminPanelDto {
    @IsIn([1,2,3])
    roleID:number
    @IsNumber()
    userID:number
}