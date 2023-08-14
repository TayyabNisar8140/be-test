import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import {userSchema} from "./auth.model"
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';



@Module({
  imports:[
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret:process.env.TOKEN_SECRET ,
      signOptions: { expiresIn: '5h' },
    }),
    MongooseModule.forFeature([{name:"users",schema:userSchema}])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
