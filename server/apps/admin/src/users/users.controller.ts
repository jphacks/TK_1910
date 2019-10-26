import { Controller } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from 'libs/db/models/user.model';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiUseTags } from '@nestjs/swagger';

@Crud({ model: User })
@Controller('admin/users')
@ApiUseTags('ユーザ')
export class UsersController {
    constructor(@InjectModel(User) private readonly model) { }
}