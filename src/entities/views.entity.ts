import { Column, Entity } from "typeorm";

import { AbstractEntity } from "@entities/abstract-entity";

@Entity("view")
export class ViewsEntity extends AbstractEntity {
	@Column({ nullable: false, unique: true })
	slug: string;

	@Column({ nullable: false, type: "int" })
	count: number;
}
