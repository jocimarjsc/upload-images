import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid} from "uuid";

@Entity("uploads")
class Upload {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    path: string;

    @Column()
    size: number;

    @Column()
    url: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        };
    }
};

export { Upload };