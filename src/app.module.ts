import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
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
