import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from 'apps/admin/src/admin.module';
import { DbModule } from 'libs/db';
import { OrderController } from './order/order.controller';
import { OrderModule } from './order/order.module';

@Module({
  imports: [AdminModule, DbModule, OrderModule],
  controllers: [AppController, OrderController],
  providers: [AppService],
})
export class AppModule {}
