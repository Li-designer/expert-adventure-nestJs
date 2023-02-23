import { UpdateUserDto } from '@/user/dto/update-user.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WsService } from './ws.service';
import { CreateWsDto } from './dto/create-ws.dto';

@ApiTags('websocket')
@Controller('ws')
export class WsController {
  constructor(private readonly wsService: WsService) { }

  @Post('addMsg')
  create(@Body() createButtonDto: CreateWsDto) {
    return this.wsService.create(createButtonDto);
  }

  @Get('wsList')
  findAll() {
    return this.wsService.findAll();
  }
}
