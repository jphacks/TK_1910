import { Controller, UseGuards } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiUseTags } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { Order } from 'libs/db/models/order.model';
import { AuthGuard } from '@nestjs/passport';

@Crud({ model: Order })
@Controller('admin/orders')
@ApiUseTags('注文')
@UseGuards(AuthGuard())
export class OrdersController {
    constructor(@InjectModel(Order) private readonly model) { }
}
