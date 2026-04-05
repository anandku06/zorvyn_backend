import { Global, Module } from '@nestjs/common';
import { PrismaModService } from './prisma_mod.service';

@Global()
@Module({
  providers: [PrismaModService],
  exports: [PrismaModService],
})
export class PrismaModModule {}
