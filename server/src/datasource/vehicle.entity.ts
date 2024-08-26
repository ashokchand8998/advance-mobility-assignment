import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}