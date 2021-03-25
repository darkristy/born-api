import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
	getHello(req, res) {
		res.json({
			message: "Hello World 🌎",
		});
	}
}
