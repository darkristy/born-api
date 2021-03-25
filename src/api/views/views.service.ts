import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ViewsEntity } from "@entities/views.entity";

@Injectable()
export class ViewsService {
	constructor(@InjectRepository(ViewsEntity) private viewsRepository: Repository<ViewsEntity>) {}

	async getAll(): Promise<ViewsEntity[]> {
		return await this.viewsRepository.find();
	}

	async getOne(slug: string): Promise<ViewsEntity> {
		const post = await this.viewsRepository.findOne({ where: { slug } });

		if (!post) {
			throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
		}

		return post;
	}
}
