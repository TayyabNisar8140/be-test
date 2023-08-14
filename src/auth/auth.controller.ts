import {
  Controller,
  Body,
  Res,
  Post,
  HttpStatus,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './auth.dto';
import { AuthGuard } from '../middlewares/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Res() response, @Body() userDto: CreateUserDto) {
    try {
      const user = await this.authService.registerUser(userDto);
      return response.status(HttpStatus.OK).json({
        user,
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
  @Post('/login')
  async login(@Res() response, @Body() userDto: CreateUserDto) {
    try {
      let jwt = await this.authService.loginUser(userDto);
      return response.status(HttpStatus.OK).json({
        jwt,
      });
    } catch (error) {
      console.log(error);
      let errorResponse = {
        statusCode: 400,
        message: 'Error: Login Unsuccessfull',
        error: 'Bad Request',
      };
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json(error?.response ? error.response : errorResponse);
    }
  }

  @UseGuards(AuthGuard)
  @Get('/user')
  async getUser(@Res() response, @Request() request) {
    try {
      let user = await this.authService.getUser(request.user.id);
      return response.status(HttpStatus.OK).json({
        user,
      });
    } catch (error) {
        console.log(error)
      let errorResponse = {
        statusCode: 400,
        message: 'Error: Login Unsuccessfull',
        error: 'Bad Request',
      };
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json(error?.response ? error.response : errorResponse);
    }
  }
}
