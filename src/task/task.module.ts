import { Module } from '@nestjs/common';
import {taskSchema} from "./task.model";
import { MongooseModule } from '@nestjs/mongoose';
import {TaskController} from "./task.controller"
import {TaskService} from "./task.service"



@Module({
    imports:[
        MongooseModule.forFeature([{name:"tasks",schema:taskSchema}])
    ],
    controllers:[TaskController],
    providers:[TaskService]
    
})
export class TaskModule {}
