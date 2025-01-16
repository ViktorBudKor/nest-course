import { ConflictException, Injectable } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from 'src/db/entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
const env = require("dotenv")
import * as nodemailer from 'nodemailer';
import { UsersService } from '../users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
const jwt = require('jsonwebtoken');

@Injectable()
export class ProfileService {
  private transporter;

  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {
      this.transporter = nodemailer.createTransport({
      host: 'smtp.mail.ru', 
      port: 465,
      auth: {
          user: 'viktor_kor@inbox.ru',
          pass: 'fzsRzSAvd3kGASeAxFfA'
      }
  });
    
  }


 async update(user:any, Dto: UpdateProfileDto) {
  
    const {frstName, secName, patronymic, email, phone, DOB} = Dto 
    let  newProfile = await this.profileRepository.findOne({where:{userId:user.sub}})
    console.log(newProfile)
    console.log()
    if(frstName!=undefined){
        newProfile.frstName = frstName;
      }

    if(secName!=undefined){
        newProfile.secName = secName
    }
    if(patronymic!=undefined){
      newProfile.patronymic = patronymic
    }
    if(email!=undefined){
      const verifyEmail = await this.profileRepository.findOne({where:{email:email}})
      if(verifyEmail.is_verifed_email){
        throw new ConflictException("This email already use")
      }
      newProfile.email = email
      newProfile.is_verifed_email = false
    }
    if(phone!=undefined){
      newProfile.phone = phone
    }
    if(DOB!=undefined){
      newProfile.DOB = DOB
    }
    console.log(newProfile)

    const updatedProfile = await this.profileRepository.save(newProfile)
    return updatedProfile;
  }



  async sendMail(user:any){
    const subject = "Confirm CODE"
    const profile = await this.profileRepository.findOne({where:{userId:user.sub},relations: ['user']})
    if(!profile.is_verifed_email){
      const payload = {
        username: profile.user.username,
        mail: profile.email,
        sub: profile.userId,
      };
       const access_token = this.jwtService.sign(payload,{
        expiresIn: '1h', // Возможные значения: '60s', '10m', '1h', '2d'
      })

      const html = `<a>http://localhost:3000/profile/${access_token}<a>` 
      const to = profile.email
      const mailOptions = {
      from: '"Your App Name" <viktor_kor@inbox.ru>', // От кого
      to, // Кому
      subject, // Тема письма
      html, // HTML-содержимое письма
      };
      await this.transporter.sendMail(mailOptions);
      return mailOptions
    }
  }

  async confirmMail(token:string){
    const secret = jwtConstants.secret;
    
    try {
      const verifiedPayload = jwt.verify(token, secret);
      const profile = await this.profileRepository.findOne({where:{userId:verifiedPayload.sub},relations: ['user']})
      if(!profile.is_verifed_email && profile.user.username == verifiedPayload.username && profile.email == verifiedPayload.mail){
        this.profileRepository.update(profile.userId,{is_verifed_email:true})
      }
    } catch (error) {
      console.error('Invalid token:', error.message);
    }
  }



}

