import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as SessionFileStore from 'session-file-store';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const FileStore = SessionFileStore(session);
  app.enableCors();
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      name: 'test-cookie',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 7200000 }, //2hrs
      store: new FileStore(),
      //그냥 express-session은 memory에 session을 할당하고, 이것은 production에 사용하면 안됨.
      // 모든 session이 같이 날라갈(휘발) 가능성이 높아져서 다른 db 나 파일등에 저장해야함.
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(5000);
}
bootstrap();
