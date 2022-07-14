import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { AtStrategy, RtStrategy } from './strategies';
import { RolesGuard } from 'src/common/guards/roles.guard';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      signOptions: { expiresIn: '15m' },
    }),
  ],
  providers: [AuthService, AtStrategy, RtStrategy, RolesGuard],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
