import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { createHmac } from 'crypto';
import { map } from 'rxjs';

@Injectable()
export class DingtalkService {
  constructor(private readonly httpService: HttpService) {}

  broadcastIp(token: string, secret: string, host: string, ip: string) {
    const timestamp = new Date().getTime();
    const sign = encodeURIComponent(
      createHmac('sha256', secret)
        .update(timestamp + '\n' + secret)
        .digest()
        .toString('base64'),
    );
    const url = `https://oapi.dingtalk.com/robot/send?access_token=${token}&timestamp=${timestamp}&sign=${sign}`;
    return this.httpService
      .post(url, {
        msgtype: 'text',
        text: {
          content: `${host}的IP已更新为${ip}`,
        },
      })
      .pipe(
        map((res) => {
          const { errcode, errmsg } = res.data;
          return {
            code: errcode,
            message: errmsg,
          };
        }),
      );
  }
}
