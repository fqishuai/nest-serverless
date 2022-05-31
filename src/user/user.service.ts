import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Agent } from 'https';
import { tap,map, lastValueFrom } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private httpService: HttpService) {}

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
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
