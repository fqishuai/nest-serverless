import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoListSchema } from '../schemas/todo-list.schema';
import { TodoListController } from '../controller/todo-list.controller';
import { TodoListService } from '../service/todo-list.service';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: 'TodoList', schema: TodoListSchema }]),
  ],
  controllers: [TodoListController],
  providers: [TodoListService]
})
export class TodoListModule {}
