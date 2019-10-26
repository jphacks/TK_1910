import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [OrdersController],
})
export class OrdersModule {}
