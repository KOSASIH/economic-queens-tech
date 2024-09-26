import { createApp } from 'express';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const app = createApp();

app.use('/api', AppController);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
