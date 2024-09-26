import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserModule } from './user.module';
import { RouterModule, Routes } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';

const userRoutes: Routes = [
  {
    path: '',
    module: UserModule,
    children: [
      {
        path: '',
        controller: UserController,
      },
    ],
  },
];

@Module({
  imports: [RouterModule.forChild(userRoutes), AuthModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserRoutesModule {}
