import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:r6H5e4YZNmIV7TP7@cluster0.ghhxkbg.mongodb.net/?retryWrites=true&w=majority'),
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    // { // 全局依赖注入拦截器TransformInterceptor
    //   provide: APP_INTERCEPTOR,
    //   useClass: TransformInterceptor,
    // },
    AppService
  ],
})
export class AppModule {}
