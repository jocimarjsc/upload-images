import { Request, Response } from "express";
import { UploadService } from "../services/UploadService";

let keyUrl = "";

class UploadController {
    async index(request: Request, response: Response) {
        const uploadService = new UploadService();

        try {
            const images = await uploadService.index();
            return response.status(200).json(images)
        } catch (error) {
            return response.status(404).json({ error: "Images not found!" })
        }
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;
        const uploadService = new UploadService();

        try {
            const images = await uploadService.show(id);
            return response.status(200).json(images)
        } catch (error) {
            return response.status(404).json({ error: "Images not found!" })
        }
    }

    async store(request: Request & {file: Express.Multer.File & {key: string; location: string }}, response: Response) {
        const { originalname: name, key, size, location: url} = request.file ;
        keyUrl = key
        const uploadService = new UploadService()

        try {
            const img = await uploadService.create({
                name, key, size, url
            });

            return response.status(201).json(img);
        } catch (error) {
            return response.status(400).json({ message: "Invalid file type!" })
        }
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
        const uploadService = new UploadService();

        try {
            const image = await uploadService.delete(id)
            return response.status(200).json(image)
        } catch (error) {
            return response.status(404).json({ error: "Image not found!" })
        }
    }
};

export { UploadController, keyUrl };