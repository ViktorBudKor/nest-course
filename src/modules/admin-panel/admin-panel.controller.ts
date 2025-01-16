import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdminPanelService } from './admin-panel.service';
import { FindUserFilterAdminPanelDto } from './dto/find-user-filter-admin-panel.dto';
import { UpdateRoleAdminPanelDto } from './dto/update-role-admin-panel.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';



@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Admin')
@Controller('admin-panel')
export class AdminPanelController {
  constructor(private readonly adminPanelService: AdminPanelService) {}

  @Post('findProfile')
  findUserByProfile(@Body() dto:FindUserFilterAdminPanelDto) {
    return this.adminPanelService.findUserByProfle(dto);
  }

  @Patch('updateRole')
  update(@Body() dto:UpdateRoleAdminPanelDto ) {
    return this.adminPanelService.update(dto.roleID,dto.userID);
  }

  @Delete('deleteUser')
  remove(@Body() body) {
    return this.adminPanelService.remove(body.id);
  }
}
