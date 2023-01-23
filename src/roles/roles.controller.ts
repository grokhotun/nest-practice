import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRoleDto } from 'src/roles/dto/create-role.dto';
import { RolesService } from 'src/roles/roles.service';

@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @Post()
  async create(@Body() dto: CreateRoleDto) {
    return this.roleService.create(dto);
  }

  @Get()
  async getAll() {
    return this.roleService.getAll();
  }

  @Get('/:value')
  async get(@Param('value') value: string) {
    return this.roleService.get(value);
  }
}
