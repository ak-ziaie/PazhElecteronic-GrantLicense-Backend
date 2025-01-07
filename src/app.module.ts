import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminmomdulesModule } from './adminmomdules/adminmomdules.module';

@Module({
  imports: [AdminmomdulesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
