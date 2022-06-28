import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Agent } from 'https';
import { Model } from 'mongoose';
import { map, lastValueFrom } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    private httpService: HttpService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async auth(code: string) {
    console.log('code::', code) // https://github.com/login/oauth/authorize?client_id=82c071ef85f64b202923&redirect_uri=http://localhost:3000/home
    try {
      /*let gihubRes = await lastValueFrom(
        this.httpService.request({
          method: 'post',
          url: `http://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`,
          // headers: { 
          //   accept: 'application/json'
          // }
        }).pipe(map(res => res.data))
      );
      let githubInfo = await lastValueFrom(
        this.httpService.get('https://api.github.com/user',{
          headers: {
            Authorization: `token ${gihubRes.split('access_token=').pop()}`,
          }
        })
      );*/
    } catch (error) {
      console.log('error reason', error)
    }
    const httpsAgent = new Agent({ rejectUnauthorized: false });
    let mockJsonData = await lastValueFrom(
      this.httpService.get('https://jsonplaceholder.typicode.com/todos', { httpsAgent }).pipe(
        map((res) => res.data)
      )
    );
    return mockJsonData;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(queryParam: unknown): Promise<User> {
    return this.userModel.findOne(queryParam).exec();
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById({ _id: id }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
  }
  
  async updateOne(updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne(updateUserDto).exec();
  }

  async delete(id: string) {
    const deleteUser = await this.userModel.findOneAndDelete({ _id: id }).exec();
    return deleteUser;
  }
}
