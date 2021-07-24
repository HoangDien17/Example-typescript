import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import { Response } from './response/response';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  async register(createUser: CreateUserDto): Promise<Response> {
    const { username, password } = createUser;
    // check user exists
    const user: User = await this.userModel.findOne({ username: username });
    if (user) {
      return {
        statusCode: 409,
        message: 'User already exists',
        data: {},
      };
    }
    const saltRounds = 10;
    const newItem: CreateUserDto = {
      username: username,
      password: bcrypt.hashSync(password, saltRounds),
    };
    const resultCreate: CreateUserDto = await this.userModel.create(newItem);
    return {
      statusCode: 201,
      message: 'register successful',
      data: {},
    };
  }
}
