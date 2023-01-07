import { Metadata } from '@grpc/grpc-js';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Hero } from './interfaces/hero.interface';
import { HeroService } from './interfaces/heroes.interface';

@Injectable()
export class AppService implements OnModuleInit {

  private heroService: HeroService

  constructor(@Inject('HERO_PACKAGE') private readonly client: ClientGrpc) {}
  onModuleInit() {
    this.heroService = this.client.getService<HeroService>('HeroService')
  }


  async getHero(): Promise<Hero> {
    // 给服务端发送元数据
    const metadata = new Metadata();
    metadata.add('Set-Cookie', 'yummy_cookie=choco');
    // heroService底层通过grpc请求微服务获取资源，可以携带元数据metadata
    return await this.heroService.findOne({ id: 2 }, metadata);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
