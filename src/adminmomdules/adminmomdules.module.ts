import { Module } from '@nestjs/common';
import { AdminmomdulesService } from './adminmomdules.service';
import { AdminmomdulesController } from './adminmomdules.controller';
// import { PrismaService } from '../prismaModule/prisma.service';
// import { RedisModule } from '../redisModule/redis.module';
// import { UsersModule } from '../usersModule/users.module';
// import { JwtTokenModule } from '../jwtTokenModule/jwt.token.module';

@Module({
  // imports: [JwtTokenModule, UsersModule, RedisModule], 
  controllers: [AdminmomdulesController],
  providers: [AdminmomdulesService],
  exports: [AdminmomdulesService],
})
export class AdminmomdulesModule {}
