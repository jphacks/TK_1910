import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from 'libs/db';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { MenusModule } from './menus/menus.module';
import { TablesModule } from './tables/tables.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [DbModule, UsersModule, CategoriesModule, MenusModule, TablesModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
