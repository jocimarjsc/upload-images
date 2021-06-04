import { Request, Response } from "express";
import { UploadService } from "../services/UploadService";

class UploadController {
    async index(request: Request, response: Response) {
        const uploadService = new UploadService();
        
        try {
            const images = await uploadService.index();
            return response.status(200).json(images)
        } catch (error) {
            return response.status(404).json({ error: "Images not found!"})
        }
    }

    async store(request: Request, response: Response) {
        const { originalname: name, filename: path, size} = request.file;

        const uploadService = new UploadService()

        try {
            const img = await uploadService.create({
                name, path, size
            });
            console.log(img)

            return response.status(201).json(img);
        } catch (error) {
            return response.status(400).json({message: "Invalid file type!"})
        }
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
        const uploadService = new UploadService();

        try {
            const image = await uploadService.delete(id)
            return response.status(200).json({image})
        } catch (error) {
            return response.status(404).json({ error: "Image not found!"})
        }
    }
};

export { UploadController };