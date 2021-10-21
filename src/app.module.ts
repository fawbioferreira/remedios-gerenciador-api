import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
	imports: [
		AuthModule,
		UsersModule,
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'postgres',
			password: 'finger@20',
			database: 'remedios_gerenciador',
			synchronize: true,
			entities: [__dirname + '/**/*.entity{.ts,.js}'],
			migrations: [
				'src/migration/**/*.ts',
			],
			subscribers: [
				'src/subscriber/**/*.ts',
			],
			cli: {
				entitiesDir: 'src/entity',
				migrationsDir: 'src/migration',
				subscribersDir: 'src/subscriber',
			},
		})
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard
		}
	],
})
export class AppModule { }
