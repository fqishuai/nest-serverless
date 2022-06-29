import { Body, Controller, Get, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from 'src/interceptor/transform.interceptor';
import { CreateTodoListDto } from '../dto/create-todo-list.dto';
import { UpdateTodoListDto } from '../dto/update-todo-list.dto';
import { TodoListService } from '../service/todo-list.service';

@Controller('todo-list')
@UseInterceptors(new TransformInterceptor()) // controller-scope的拦截器
export class TodoListController {
  constructor(private readonly todoListService: TodoListService) {}

  @Post('create')
  @HttpCode(200)
  async create(@Body() createTodoListDto: CreateTodoListDto) {
    return this.todoListService.create(createTodoListDto);
  }

  @Get('findAll')
  async findAll() {
    return this.todoListService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.todoListService.findById(id);
  }

  @Post('update/:id')
  async update(@Param('id') id: string, @Body() updateTodoListDto: UpdateTodoListDto) {
    return this.todoListService.update(id, updateTodoListDto);
  }

  @Get('delete/:id')
  async delete(@Param('id') id: string) {
    return this.todoListService.delete(id);
  }
}
