import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { DingtalkService } from './dingtalk.service';

class Params {
  token: string;
  secret: string;
  host: string;
  ip: string;
}

@Controller('dingtalk')
export class DingtalkController {
  constructor(private readonly dingtalkService: DingtalkService) {}

  @Get('broadcast')
  broadcastIp(@Query() params: Params) {
    const { token, secret, host, ip } = params;
    if (token && secret && host && ip) {
      return this.dingtalkService.broadcastIp(token, secret, host, ip);
    } else {
      throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
    }
  }
}
