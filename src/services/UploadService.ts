import { getCustomRepository, Repository } from "typeorm"
import { Upload } from "../entities/Upload"
import { UploadRepository } from "../repositories/UploadRepository";
import aws from "aws-sdk";

const s3 = new aws.S3()

interface Idata {
    name: string;
    key: string;
    size: number;
    url: string;
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

    async show(id: string) {
        const image = await this.uploadRepository.find({ where: {id} });
        
        if(!image) {
            return "image not found!"
        }

        return image

    }

    async create({name, key, size, url}: Idata){
        const img = this.uploadRepository.create({
            name, key, size, url
        });

        await this.uploadRepository.save(img);

        return img;
    }

    async delete(id: string) {
        const images = await this.uploadRepository.find({ where: {id} });
        
        if(!images) {
            return "image not found!"
        }
        
        const deletedImage = s3.deleteObject({
            Bucket:"uploads-joci",
            Key: images[0].key
        }, (e) => {
            if(e) {
                return e
            }
            return "Image is deleted!"
        })

        await this.uploadRepository.remove(images);

        return deletedImage

    }
};

export { UploadService }