import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoList, TodoListDocument } from '../schemas/todo-list.schema';
import { CreateTodoListDto } from '../dto/create-todo-list.dto';
import { UpdateTodoListDto } from '../dto/update-todo-list.dto';

@Injectable()
export class TodoListService {
  constructor(
    private httpService: HttpService,
    @InjectModel('TodoList') private readonly todoListModel: Model<TodoListDocument>,
  ) {}

  async create(createTodoListDto: CreateTodoListDto): Promise<TodoList> {
    const createdUser = await this.todoListModel.create(createTodoListDto);
    return createdUser;
  }

  async findAll(): Promise<TodoList[]> {
    return this.todoListModel.find().exec();
  }

  async findOne(queryParam: unknown): Promise<TodoList> {
    return this.todoListModel.findOne(queryParam).exec();
  }

  async findById(id: string): Promise<TodoList> {
    return this.todoListModel.findById({ _id: id }).exec();
  }

  async update(id: string, updateUserDto: UpdateTodoListDto) {
    return this.todoListModel.findByIdAndUpdate(id, updateUserDto).exec();
  }
  
  async updateOne(updateUserDto: UpdateTodoListDto) {
    return this.todoListModel.updateOne(updateUserDto).exec();
  }

  async delete(id: string) {
    const deleteUser = await this.todoListModel.findOneAndDelete({ _id: id }).exec();
    return deleteUser;
  }
}
