import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ViewsEntity } from "@entities/views.entity";

import { ViewsController } from "./views.controller";
import { ViewsService } from "./views.service";

@Module({
	imports: [TypeOrmModule.forFeature([ViewsEntity])],
	controllers: [ViewsController],
	providers: [ViewsService],
})
export class ViewsModule {}
