import { PartialType } from '@nestjs/swagger';
import { CreateProfileDto } from './create-profile.dto';
import { IsDateString, isDateString, IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateProfileDto {
    @IsString()
    frstName:string;
    @IsString()
    secName:string;
    @IsString()
    patronymic: string;
    @IsEmail()
    email:string
    @IsPhoneNumber()
    phone:string
    @IsDateString()
    DOB:string
}
