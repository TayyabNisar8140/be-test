import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { taskDocument } from './task.model';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTaskDto } from './task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel('tasks') private readonly taskSchema: Model<taskDocument>,
  ) {}
  async getAllTasks() {
    return await this.taskSchema.find();
  }

  async createTask(createTaskDto: CreateTaskDto) {
    let saveTask = new this.taskSchema(createTaskDto);
    return await saveTask.save();
  }
  async deleteBulk(ids: string[]) {
    return await this.taskSchema.deleteMany({ _id: { $in:  ids  } });
  }
}
