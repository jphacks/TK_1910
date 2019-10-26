import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './models/user.model';
import { Category } from './models/category.model';
import { Menu } from './models/menu.model';
import { Order } from './models/order.model';
import { Table } from './models/table.model';

const models = TypegooseModule.forFeature([User, Category, Menu, Order, Table]);

@Global()
@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost/popcorn-db', {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }),
    models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule { }
