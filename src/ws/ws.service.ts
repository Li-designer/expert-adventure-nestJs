import { Ws } from './entities/ws.entity';
import { Injectable, Query } from '@nestjs/common';
import { CreateWsDto } from './dto/create-ws.dto';
import { UpdateWsDto } from './dto/update-ws.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Page } from '@/type/user';
import { Role } from '@/type/menu';

@Injectable()
export class WsService {
  constructor(
    @InjectRepository(Ws)
    private readonly wsRepository: Repository<Ws>,
  ) { }
  async create(CreateWsDto: CreateWsDto) {
    return await this.wsRepository.save(CreateWsDto);
  }
  // 查找所有聊天记录
  async findAll() {
    return await this.wsRepository.find();
  }
}
