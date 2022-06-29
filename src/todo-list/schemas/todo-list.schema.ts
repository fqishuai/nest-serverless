import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TodoList {
  @Prop()
  content: string;

  @Prop()
  startTime: string;

  @Prop()
  doneTime: string;
}

export const TodoListSchema = SchemaFactory.createForClass(TodoList);

export type TodoListDocument = TodoList & Document;