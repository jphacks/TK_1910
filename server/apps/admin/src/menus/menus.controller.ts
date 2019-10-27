import { Controller, UseGuards, Get } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiUseTags } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { Menu } from 'libs/db/models/menu.model';
import { AuthGuard } from '@nestjs/passport';
import { allergies } from 'libs/db/models/allergies';

@Crud({ model: Menu })
@Controller('admin/menus')
@ApiUseTags('メニュー')
@UseGuards(AuthGuard())
export class MenusController {
    constructor(@InjectModel(Menu) private readonly model) { }

    @Get('allergies')
    GetAllergies() {
        return allergies;
    }
}
