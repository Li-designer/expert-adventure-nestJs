import { Module } from '@nestjs/common';
import { ButtonService } from './button.service';
import { ButtonController } from './button.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuModule } from '@/menu/menu.module';
import { Button } from './entities/button.entity';

@Module({
  imports: [MenuModule, TypeOrmModule.forFeature([Button])],
  controllers: [ButtonController],
  providers: [ButtonService],
  exports: [ButtonService],
})
export class ButtonModule {}
