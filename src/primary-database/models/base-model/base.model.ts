import {
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn,
} from "typeorm";

export class BaseModel {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @VersionColumn({ default: 1 })
    version: number;

    @DeleteDateColumn()
    deletedAt: Date;
}
