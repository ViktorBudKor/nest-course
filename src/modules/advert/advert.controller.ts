import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AdvertService } from './advert.service';
import { CreateAdvertDto } from './dto/create-advert.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { StatusAdvertDto } from './dto/status-advert.dto';
import { PublishedAdvertDto } from './dto/published-advert.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

@Controller('advert')
@ApiTags('advert')
export class AdvertController {
  constructor(private readonly advertService: AdvertService) {}
  @UseGuards(JwtAuthGuard)
  @Post('/create') //Создание объявления гаража
  @ApiOperation({ summary: 'Создать объявление о гараже' })
  @ApiBody({ type: CreateAdvertDto })
  @ApiResponse({ status: 201, description: 'Объявление успешно создано'})
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  create(@Body() createAdvertDto: CreateAdvertDto, @Request() req) {
    return this.advertService.create(createAdvertDto,req.user);
  }

  @Get('/garages') //Посмотреть опубликованные объявления
  @ApiOperation({ summary: 'Просмотр опубликованных объявлений' })
  @ApiResponse({ status: 200, description: 'Возвращает список опубликованных объявлений' })
  findPublishedAd() {
    return this.advertService.findPublishedAd();
  }
  @UseGuards(JwtAuthGuard)
  @Get('/MyGarages') //посмотереть мои объявления
  @ApiOperation({ summary: 'Просмотр моих объявлений' })
  @ApiResponse({ status: 200, description: 'Возвращает объявления текущего пользователя'})
  findAdByUserId(@Request() req) {
    return this.advertService.findAdByUserId(req.user.id);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  @Patch('/status') //Изменить объявление по id
  @ApiOperation({ summary: 'Изменить статус объявления по ID' })
  @ApiBody({ type: StatusAdvertDto })
  @ApiResponse({ status: 200, description: 'Статус объявления успешно обновлен'})
  @ApiResponse({ status: 404, description: 'Гараж не найден' })
  @ApiResponse({ status: 403, description: 'Доступ запрещен' })
  updateStatus(@Body() statusAdvertDto: StatusAdvertDto) {
    return this.advertService.updateStatus(statusAdvertDto);
  }
  @UseGuards(JwtAuthGuard)
  @Patch('/published') //Изменить объявление по id
  @ApiOperation({ summary: 'Опубликовать объявление' })
  @ApiBody({ type: PublishedAdvertDto })
  @ApiResponse({ status: 200, description: 'Объявление успешно опубликовано'})
  @ApiResponse({ status: 403, description: 'Доступ запрещен' })
  @ApiResponse({ status: 406, description: 'Вы не можете изменить это объявление' })
  updatePublished(@Body() publishedAdvertDto:PublishedAdvertDto ,@Request() req) {
    return this.advertService.updatePublished(publishedAdvertDto, req.user);
  }
  // @UseGuards(JwtAuthGuard)
  // @Patch(':id') //Изменить статус объявления по id
  // updatee(@Param('id') id: string, @Body() updateAdvertDto: UpdateAdvertDto) {
  //   return this.advertService.update(+id, updateAdvertDto);
  // }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  @Get('/check') //Посмотреть объявления на рассмотрении
  @ApiOperation({ summary: 'Просмотр объявлений на рассмотрении' })
  @ApiResponse({ status: 200, description: 'Возвращает объявления на рассмотрении'})
  @ApiResponse({ status: 403, description: 'Доступ запрещен' })
  findChecking() {
    return this.advertService.findChecking();
  }

}
