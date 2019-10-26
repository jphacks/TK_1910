import { Module } from '@nestjs/common';
import { MenusController } from './menus.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [MenusController],
})
export class MenusModule {}
