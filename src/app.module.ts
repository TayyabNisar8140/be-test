import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';



@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),MongooseModule.forRoot(process.env.DB_CONNECTION_STRING,{dbName:process.env.DB_NAME}), AuthModule, TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
