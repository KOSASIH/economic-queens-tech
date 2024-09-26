import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RouterModule, Routes } from '@nestjs/common';
import { UserRoutesModule } from './routes/user.routes';
import { WalletRoutesModule } from './routes/wallet.routes';

const appRoutes: Routes = [
  {
    path: 'users',
    module: UserRoutesModule,
  },
  {
    path: 'wallets',
    module: WalletRoutesModule,
  },
];

@Module({
  imports: [RouterModule.forRoot(appRoutes)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppRoutesModule {}
