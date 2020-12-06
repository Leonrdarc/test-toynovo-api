import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Toy {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    name: string;

    @Column({nullable: true})
    description: string;

    @Column({nullable: false})
    price: number;
    
    @Column({default: "default.png"})
    img: string;
}