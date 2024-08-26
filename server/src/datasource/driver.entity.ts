import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Driver {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column({nullable: true})
    profilePic: string;
}