import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { HousesModule } from './modules/houses/houses.module';
import { AuthModule } from './modules/auth/auth.module';
import { BookingsModule } from './modules/bookings/bookings.module';

@Module({
  imports: [UsersModule, HousesModule, AuthModule, BookingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
