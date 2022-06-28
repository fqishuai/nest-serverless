import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TransformInterceptor } from 'src/interceptor/transform.interceptor';

@Controller('user')
@UseInterceptors(new TransformInterceptor()) // controller-scope的拦截器
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  auth(@Query('code') code: string) {
    return this.userService.auth(code);
  }

  @Post('create')
  @HttpCode(200)
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('findAll')
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(id, updateUserDto);
  // }
  @Post('update/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
  // @Post('update')
  // async update(@Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.updateOne(updateUserDto);
  // }

  @Get('delete/:id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
