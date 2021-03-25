import * as webSocket from "ws";
import * as helmet from "helmet";
import { NestFactory } from "@nestjs/core";
import { Logger } from "@nestjs/common";

import { LoggingInterceptor } from "@shared/logging.interceptor";
import { HttpErrorFilter } from "@shared/http-error.filter";
import { DatabaseService } from "@database/database.service";

import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule);
	const port = process.env.PORT || 8000;

	const database = new DatabaseService();

	app.use(function(req, res, next) {
		res.header("x-powered-by", "Blood sweat and tears.");
		next();
	});
	app.use(helmet());

	app.enableCors();
	app.useGlobalInterceptors(new LoggingInterceptor());
	app.useGlobalFilters(new HttpErrorFilter());

	const server = await app.listen(port);
	const wss = new webSocket.Server({ server: server });

	wss.on("connection", function connection(ws) {
		console.log("New client connected 🔌");
		ws.on("message", async function incoming(data) {
			console.log("received: %s", data);

			const post = await database.viewRepository().findOne({ where: { slug: data } });

			console.log(post);
			if (!post) {
				const newEntry = database.viewRepository().create({ slug: data.toString(), count: 1 });
				await database.viewRepository().save(newEntry);
			}

			if (post) {
				const { id } = await database.viewRepository().findOne({ where: { slug: data.toString() } });
				await database.viewRepository().update(id, { count: post.count + 1 });
			}
		});
	});

	Logger.log(`Server running on port http://localhost:${port}`, "Bootstrap");
}
bootstrap();
