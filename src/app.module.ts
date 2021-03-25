import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { DatabaseService } from "@database/database.service";
import { ViewsModule } from "@api/views/views.module";

import { AppService } from "./app.service";
import { AppController } from "./app.controller";

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useClass: DatabaseService,
		}),
		ConfigModule.forRoot({ isGlobal: true }),
		ViewsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
