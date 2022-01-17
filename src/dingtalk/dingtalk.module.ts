import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DingtalkController } from './dingtalk.controller';
import { DingtalkService } from './dingtalk.service';

@Module({
  imports: [HttpModule],
  controllers: [DingtalkController],
  providers: [DingtalkService],
})
export class DingtalkModule {}
