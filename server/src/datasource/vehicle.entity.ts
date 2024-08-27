import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from "typeorm";
import { Transfer } from "./transfer.entity";

@Entity()
export class Vehicle {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    vehicleNumber: string;

    @Column()
    vehicleType: string;

    @Column()
    pucCert: string;

    @Column()
    insuranceCert: string;

    @Column({nullable: true})
    currentOwnerId: number;

    @Column({nullable: true})
    currentOwnerName: string;

    @Column({nullable: true})
    currentOwnerType: string;

    @Column()
    @CreateDateColumn()
    date: Date;

    @OneToMany(() => Transfer, (transfer) => transfer.vehicle)
    transfers: Transfer[];
}