import { getCustomRepository, Repository } from "typeorm"
import { Upload } from "../entities/Upload"
import { UploadRepository } from "../repositories/UploadRepository";
import aws from "aws-sdk";
import fs from "fs";
import path from "path";
import { promisify } from "util";

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

        const key = images[0].key

        const options = {
            Bucket: "uploads-joci",
            Key: key
        }

        if(process.env.STORAGE_TYPE === "s3") {
            //deleted file in aws.s3
            s3.deleteObject(options).promise();
        } else {
            promisify(fs.unlink)(path.resolve(__dirname, "..", "..", "tmp", "uploads", key))
        }
        
        await this.uploadRepository.remove(images);

        const msg = {
            message: "Image is deleted!"
        }
        return msg

    }
};

export { UploadService }