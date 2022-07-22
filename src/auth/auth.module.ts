import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { AtStrategy } from './strategies';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { RefreshTokensEntity } from './entities/rt.entity';
import { RtStrategy } from './strategies/rt.strategy';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RefreshTokensEntity]),
    JwtModule.register({
      signOptions: { expiresIn: '15m' },
    }),
  ],
  providers: [AuthService, AtStrategy, RtStrategy, RolesGuard],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
