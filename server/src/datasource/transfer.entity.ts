import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Vehicle } from "./vehicle.entity";




@Entity()
export class Transfer {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Vehicle, (vehicle) => vehicle.transfers)
    vehicle: Vehicle;

    @Column()
    newOwnerId: number;

    @Column()
    newOwnerType: string;

    @Column()
    newOwnerName: string;

    @Column({ nullable: true })
    previousOwnerId: number;

    @Column({ nullable: true })
    previousOwnerType: string;

    @Column({ nullable: true })
    previousOwnerName: string;

    @Column()
    @CreateDateColumn()
    date: Date;
}

/*
SELECT * FROM transfer_history th
LEFT JOIN (
    SELECT id, name, 'Driver' AS owner_type FROM drivers
    UNION ALL
    SELECT id, name, 'Company' AS owner_type FROM companies
    -- Add more unions for other types
) owners ON th.owner_id = owners.id AND th.owner_type = owners.owner_type;

*/