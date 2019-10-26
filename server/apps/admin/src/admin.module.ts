import { Module } from '@nestjs/common';
import { DbModule } from 'libs/db';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { MenusModule } from './menus/menus.module';
import { TablesModule } from './tables/tables.module';
import { OrdersModule } from './orders/orders.module';
import { AdminController } from './admin.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DbModule, UsersModule, CategoriesModule, MenusModule, TablesModule, OrdersModule, AuthModule],
  controllers: [AdminController],
})
export class AdminModule {}
