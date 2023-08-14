import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UserDocument } from './auth.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './auth.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('users') private readonly userSchema: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  async registerUser(
    userDto: CreateUserDto,
  ): Promise<{ email: string; id: string }> {
    let user = await this.userSchema.findOne({ email: userDto.email });
    if (user) {
      throw new BadRequestException(
        `user already register against ${userDto.email}`,
      );
    }

    let hashPassword = bcrypt.hashSync(userDto.password, 10);
    userDto['password'] = hashPassword;

    let newUser = await new this.userSchema(userDto);
    let saveUser = await newUser.save();
    return {
      id: saveUser.id,
      email: saveUser.email,
    };
  }

  async loginUser(userDto: CreateUserDto): Promise<string> {
    let user = await this.userSchema.findOne({ email: userDto.email });
    if (user) {
      let isRightPassword = bcrypt.compareSync(userDto.password, user.password);
      if (isRightPassword) {
        let payload = {
          id: user.id,
          email: user.email,
        };
        return await this.jwtService.signAsync(payload);
      } else {
        throw new BadRequestException('Incorrect Password');
      }
    } else {
      throw new NotFoundException(`${userDto.email} not registered!`);
    }
  }

  async getUser(userId: string) {
    return await this.userSchema.findById({ _id: userId });
  }
}
