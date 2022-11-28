import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Teste técnico MKS - Documentação')
    .setDescription(
      'Documentação da API para o teste técnico da MKS feita com o Swagger.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('users', 'Nesta rota é aonde você ira criar seu usuário.')
    .addTag(
      'auth',
      'Aqui você realizará o login e recebera o token para testar as outras rotas.',
    )
    .addTag(
      'movies',
      'Após feito o login e inserido o token no "Authorize", poderá usar essas rotas.',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
