import { Controller } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiUseTags } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { Order } from 'libs/db/models/order.model';

@Crud({ model: Order })
@Controller('admin/orders')
@ApiUseTags('注文')
export class OrdersController {
    constructor(@InjectModel(Order) private readonly model) { }
}
