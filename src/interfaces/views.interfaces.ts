import { IsInt, IsString } from "class-validator";

export class ViewsDTO {
	@IsString()
	slug: string;

	@IsInt()
	count: number;
}

export class ViewsRO {
	id: number;
	slug: string;
	count: number;
	createdAt: Date;
}
