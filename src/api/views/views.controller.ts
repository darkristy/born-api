import { Controller, Get, Logger, Param } from "@nestjs/common";

import { ViewsService } from "@api/views/views.service";

@Controller("views")
export class ViewsController {
	private logger = new Logger("ViewsController");
	constructor(private viewsService: ViewsService) {}

	@Get("/")
	async getAll() {
		const views = await this.viewsService.getAll();
		return { views };
	}

	@Get("/")
	async getOne(@Param("slug") slug: string) {
		const views = await this.viewsService.getOne(slug);
		return { views };
	}
}
