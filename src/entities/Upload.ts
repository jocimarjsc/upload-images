import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid} from "uuid";
import { keyUrl } from "../controllers/uploadController";

@Entity("uploads")
class Upload {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    key: string;

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

        if(!this.url) {
            this.url = `${process.env.APP_URL}/files/${keyUrl}`
        }
    }
};

export { Upload };