import {
  Controller,
  Get,
  Post,
  UseGuards,
  Res,
  HttpStatus,
  Body,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '../middlewares/auth.guard';
import { TaskService } from './task.service';
import { CreateTaskDto } from './task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(AuthGuard)
  @Get('/list-tasks')
  async allTasks(@Res() response) {
    try {
      let tasks = await this.taskService.getAllTasks();
      return response.status(HttpStatus.OK).json({
        tasks,
      });
    } catch (error) {
      let errorResponse = {
        statusCode: 400,
        message: 'Error: Registration Unsuccessfull',
        error: 'Bad Request',
      };
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json(error?.response ? error.response : errorResponse);
    }
  }
  @UseGuards(AuthGuard)
  @Post('/create-task')
  async newTask(@Res() response, @Body() createTaskDto: CreateTaskDto) {
    try {
      let newTask = await this.taskService.createTask(createTaskDto);
      return response.status(HttpStatus.OK).json({ task: newTask });
    } catch (error) {
      let errorResponse = {
        statusCode: 400,
        message: 'Error: Registration Unsuccessfull',
        error: 'Bad Request',
      };
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json(error?.response ? error.response : errorResponse);
    }
  }

  @UseGuards(AuthGuard)
  @Post('/delete')
  async deleteTasks(@Res() response, @Body() tasks: any) {
    try {
      console.log(tasks);
      let deletedTasks = await this.taskService.deleteBulk(tasks.tasks);
      return response
        .status(HttpStatus.OK)
        .json({ message: 'deleted successfully' });
    } catch (error) {
      console.log(error);
      let errorResponse = {
        statusCode: 400,
        message: 'Error: No task Deleted',
        error: 'Bad Request',
      };
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json(error?.response ? error.response : errorResponse);
    }
  }
}
