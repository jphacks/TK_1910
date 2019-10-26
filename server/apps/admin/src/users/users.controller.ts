import { Controller, UseGuards } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from 'libs/db/models/user.model';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Crud({ model: User })
@Controller('admin/users')
@ApiUseTags('ユーザ')
@UseGuards(AuthGuard())
export class UsersController {
    constructor(@InjectModel(User) private readonly model) { }
}
