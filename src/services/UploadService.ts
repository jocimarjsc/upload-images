import { getCustomRepository, Repository } from "typeorm"
import { Upload } from "../entities/Upload"
import { UploadRepository } from "../repositories/UploadRepository";

interface Idata {
    name: string;
    path: string;
    size: number;
}

class UploadService {
    private uploadRepository: Repository<Upload>;

    constructor() {
        this.uploadRepository = getCustomRepository(UploadRepository)
    }

    async index() {
        const images = await this.uploadRepository.find({
            order: {
                created_at: "DESC"
            }
        });

        return images;
    }

    async create({name, path, size}: Idata){
        const img = this.uploadRepository.create({
            name, path, size
        });

        await this.uploadRepository.save(img);

        return img;
    }

    async delete(id: string) {
        const image = await this.uploadRepository.find({ where: {id} });
        
        if(!image) {
            return "image not found!"
        }

        const removed = await this.uploadRepository.remove(image);

        return removed

    }
};

export { UploadService }