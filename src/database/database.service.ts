/* eslint-disable @typescript-eslint/explicit-function-return-type */
import "dotenv/config";
import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { getRepository, Repository } from "typeorm";

import { ViewsEntity } from "@entities/views.entity";

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
	// private username = process.env.POSTGRES_USER;
	// private password = process.env.POSTGRES_PASSWORD;
	// private databaseName = process.env.NODE_ENV === "test" ? process.env.POSTGRES_DB_TEST : process.env.POSTGRES_DB;

	// private databaseUrl =
	// 	process.env.NODE_ENV === "production"
	// 		? process.env.DATABASE_URL
	// 		: `postgres://${this.username}:${this.password}@localhost:5432/${this.databaseName}`;

	private databaseUrl = process.env.DATABASE_URL;
	private logging = process.env.NODE_ENV === "production" ? false : true;
	private dropSchema = process.env.NODE_ENV === "test" ? true : false;

	private viewsRepository: Repository<ViewsEntity>;

	createTypeOrmOptions(): TypeOrmModuleOptions {
		return {
			type: "postgres",
			url: this.databaseUrl,
			entities: ["dist/**/*.entity.js"],
			synchronize: true,
			logging: this.logging,
			dropSchema: this.dropSchema,
			ssl: {
				rejectUnauthorized: false,
			},
		};
	}

	viewRepository() {
		return (this.viewsRepository = getRepository(ViewsEntity));
	}
}
