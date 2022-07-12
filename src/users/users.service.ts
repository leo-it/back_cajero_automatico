import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './intefaces/user.interface';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

// export type User = any;

@Injectable()
export class UsersService {
  constructor(@InjectModel('users') private readonly userModel: Model<IUser>) {}

  // private readonly users = [
  //   {
  //     userId: 1,
  //     username: 'andres',
  //     password: 123,
  //   },
  //   {
  //     userId: 2,
  //     username: 'felipe',
  //     password: 123,
  //   },
  // ];

  // async findOne(username: string): Promise<User> {
  //   return this.users.find((user) => user.username === username);
  // }

  async findOne(username: string): Promise<IUser> {
    return await this.userModel.findOne({ username });
  }

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const { username, password } = createUserDto;

    const salt = await bcrypt.genSalt();

    const userExists = await this.findOne(username);
    if (userExists) {
      throw new ConflictException('username already exists');
    }

    const user = new this.userModel(createUserDto);
    user.username = username;
    user.password = await this.hasPassword(password, salt);
    return await user.save();
  }

  private hasPassword(password, salt): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
