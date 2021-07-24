import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
  ],
  // controllers: [AuthController],
  // providers: [AuthService],
})
export class AppModule {}
