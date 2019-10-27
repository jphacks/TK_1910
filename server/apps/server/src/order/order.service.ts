import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
    async totalSumAmount(order_detail) {
        return 1000;
    }
}
