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

            return response.status(201).json(img);
        } catch (error) {
            return response.status(400).json({message: "Invalid file type!"})
        }
    }
};

export { UploadController };