import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
