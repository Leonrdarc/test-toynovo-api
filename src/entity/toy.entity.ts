import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Toy {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    title: string;

    @Column({nullable: false})
    description: string;

    @Column({default: "default.png"})
    img: string;
}