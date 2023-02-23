import { PartialType } from '@nestjs/swagger';
import { CreateWsDto } from './create-ws.dto'
export class UpdateWsDto extends PartialType(CreateWsDto) {}
